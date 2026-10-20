import { useSignIn, useSignUp } from '@clerk/expo';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandLogo, Button, Text, TextField } from '@/components/ui';
import { authError, incompleteAuth } from '@/lib/auth/errors';

export function VerificationScreen() {
  const { flow, sendFailed } = useLocalSearchParams<{ flow?: string; sendFailed?: string }>();
  const signingIn = flow === 'sign-in';
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const [notice, setNotice] = useState(sendFailed ? 'We couldn’t send your code. Tap Resend code to try again.' : '');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const active = signingIn
    ? signIn.status === 'needs_client_trust' || signIn.status === 'needs_second_factor' || signIn.status === 'complete'
    : Boolean(signUp.id) && (signUp.unverifiedFields.includes('email_address') || signUp.status === 'complete');

  async function run(resend: boolean) {
    if (locked.current) return;
    if (!resend && !/^\d{6}$/.test(code)) {
      setNotice('Enter the six-digit code from your email.');
      return;
    }
    locked.current = true;
    setBusy(true);
    setNotice('');
    setSent(false);
    try {
      if (resend) {
        const result = signingIn ? await signIn.mfa.sendEmailCode() : await signUp.verifications.sendEmailCode();
        if (result.error) throw result.error;
        setSent(true);
      } else {
        const resource = signingIn ? signIn : signUp;
        if (resource.status !== 'complete') {
          const result = signingIn ? await signIn.mfa.verifyEmailCode({ code }) : await signUp.verifications.verifyEmailCode({ code });
          if (result.error) throw result.error;
        }
        if (resource.status === 'complete') {
          const result = await resource.finalize();
          if (result.error) throw result.error;
        } else {
          setNotice(incompleteAuth);
        }
      }
    } catch (error) {
      setNotice(authError(error));
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  function back() {
    if (signingIn) signIn.reset();
    else signUp.reset();
    router.replace(signingIn ? '/sign-in' : '/sign-up');
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-surface" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View className="gap-6 p-6">
          <BrandLogo />
          <Text variant="heading" accessibilityRole="header">Check your email</Text>
          {active ? (
            <>
              <Text tone="secondary">{signingIn ? 'Enter the six-digit code to confirm it’s you.' : 'Enter the six-digit code to verify your email.'}</Text>
              <TextField label="Verification code" accessibilityLabel="Verification code" value={code} onChangeText={setCode} keyboardType="number-pad" autoComplete="one-time-code" textContentType="oneTimeCode" maxLength={6} editable={!busy} onSubmitEditing={() => void run(false)} />
              {notice ? <Text tone="danger" accessibilityRole="alert">{notice}</Text> : null}
              {sent ? <Text tone="success" accessibilityLiveRegion="polite">A new code is on its way.</Text> : null}
              <Button label="Verify" loading={busy} onPress={() => void run(false)} />
              <Button label="Resend code" variant="secondary" disabled={busy} onPress={() => void run(true)} />
            </>
          ) : <Text tone="secondary">Start again to request a new verification code.</Text>}
          <Button label={signingIn ? 'Back to sign in' : 'Back to sign up'} variant="secondary" disabled={busy} onPress={back} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
