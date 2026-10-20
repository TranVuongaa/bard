import { useSignIn, useSignUp } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandLogo, Button, PressableScale, Text, TextField } from '@/components/ui';
import { useSocialAuth } from '@/hooks/use-social-auth';
import { authError, incompleteAuth } from '@/lib/auth/errors';
import { validateEmail, validatePassword } from '@/lib/auth/validate';

import { GoogleButton } from './google-button';

export function AuthForm({ mode }: { mode: 'sign-up' | 'sign-in' }) {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const social = useSocialAuth();
  const locked = useRef(false);
  const [busy, setBusy] = useState(false);
  const insets = useSafeAreaInsets();
  const signingUp = mode === 'sign-up';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState('');
  const nameError = signingUp && !name.trim() ? 'Enter your name.' : undefined;
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password, signingUp);
  const disabled = busy || social.busy;

  async function submit() {
    if (locked.current || social.busy) return;
    setSubmitted(true);
    setNotice('');
    if (nameError || emailError || passwordError) return;
    Keyboard.dismiss();
    locked.current = true;
    setBusy(true);
    try {
      if (signingUp) {
        const [firstName, ...rest] = name.trim().split(/\s+/);
        const { error } = await signUp.password({ emailAddress: email.trim(), password, firstName, lastName: rest.join(' ') || undefined });
        if (error) throw error;
        if (signUp.status === 'complete') {
          const result = await signUp.finalize();
          if (result.error) throw result.error;
        } else if (signUp.unverifiedFields.includes('email_address')) {
          // Open verification even if sending fails, so the guest can retry there.
          const sent = await signUp.verifications.sendEmailCode();
          router.push({ pathname: '/verify', params: { flow: 'sign-up', sendFailed: sent.error ? '1' : undefined } });
        } else {
          setNotice(incompleteAuth);
        }
      } else {
        const { error } = await signIn.password({ emailAddress: email.trim(), password });
        if (error) throw error;
        if (signIn.status === 'complete') {
          const result = await signIn.finalize();
          if (result.error) throw result.error;
        } else if (signIn.status === 'needs_client_trust' || (signIn.status === 'needs_second_factor' && signIn.supportedSecondFactors?.some(f => f.strategy === 'email_code'))) {
          const sent = await signIn.mfa.sendEmailCode();
          router.push({ pathname: '/verify', params: { flow: 'sign-in', sendFailed: sent.error ? '1' : undefined } });
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

  return (
    <KeyboardAvoidingView className="flex-1 bg-surface" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View className="flex-1 gap-6 px-6 pb-6">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel="Back"
            disabled={disabled}
            className="self-start"
            onPress={() => router.canGoBack() ? router.back() : router.replace('/onboarding')}
            contentClassName="min-h-11 justify-center">
            <Text variant="caption">Back</Text>
          </PressableScale>
          <BrandLogo />
          <View className="gap-3">
            <Text variant="heading" accessibilityRole="header">{signingUp ? 'Your next chapter\nstarts here' : 'Welcome back'}</Text>
            <Text tone="secondary">{signingUp ? 'Create an account to find your kind of stay.' : 'Sign in and find your next getaway.'}</Text>
          </View>
          <View className="gap-4">
            {signingUp ? (
              <TextField label="Name" accessibilityLabel="Name" placeholder="Your name" autoComplete="name" textContentType="name" value={name} onChangeText={setName} editable={!disabled} error={submitted ? nameError : undefined} />
            ) : null}
            <TextField label="Email" accessibilityLabel="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" textContentType="emailAddress" value={email} onChangeText={setEmail} editable={!disabled} error={submitted ? emailError : undefined} />
            <TextField label="Password" accessibilityLabel="Password" placeholder={signingUp ? 'At least 8 characters' : 'Your password'} secureTextEntry autoCapitalize="none" autoCorrect={false} autoComplete={signingUp ? 'new-password' : 'current-password'} textContentType={signingUp ? 'newPassword' : 'password'} value={password} onChangeText={setPassword} editable={!disabled} error={submitted ? passwordError : undefined} returnKeyType="done" onSubmitEditing={submit} />
          </View>
          <View nativeID="clerk-captcha" />
          {notice || social.error ? (
            <View accessibilityRole="alert" accessibilityLiveRegion="polite" className="rounded-md bg-danger-soft p-4">
              <Text variant="caption" tone="danger">{notice || social.error}</Text>
            </View>
          ) : null}
          <View className="gap-3">
            <Button label={signingUp ? 'Create account' : 'Sign in'} trailingIcon="arrowRight" loading={busy} disabled={disabled} onPress={submit} />
            <GoogleButton disabled={disabled} onPress={() => { Keyboard.dismiss(); setNotice(''); void social.start('oauth_google'); }} />
            <Button label="Continue with Apple" variant="secondary" disabled={disabled} onPress={() => { Keyboard.dismiss(); setNotice(''); void social.start('oauth_apple'); }} />
            {social.busy ? <Text variant="caption" tone="secondary">Waiting for sign-in…</Text> : null}
          </View>
          <PressableScale
            accessibilityRole="link"
            disabled={disabled}
            onPress={() => router.replace(signingUp ? '/sign-in' : '/sign-up')}
            contentClassName="min-h-11 items-center justify-center">
            <Text variant="caption">
              {signingUp ? 'Already have an account? ' : 'New to Bard? '}
              <Text variant="button">{signingUp ? 'Sign in' : 'Sign up'}</Text>
            </Text>
          </PressableScale>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
