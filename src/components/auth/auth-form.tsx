import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandLogo, Button, PressableScale, Text, TextField } from '@/components/ui';

import { GoogleButton } from './google-button';

export function AuthForm({ mode }: { mode: 'sign-up' | 'sign-in' }) {
  const router = useRouter();
  const { provider } = useLocalSearchParams<{ provider?: string }>();
  const insets = useSafeAreaInsets();
  const signingUp = mode === 'sign-up';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(provider === 'google' ? 'Google sign-in is coming soon.' : '');
  const nameError = signingUp && !name.trim() ? 'Enter your name.' : undefined;
  const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Enter a valid email address.' : undefined;
  const passwordError = password.length < 8 ? 'Use at least 8 characters.' : undefined;

  function submit() {
    setSubmitted(true);
    setNotice('');
    if (nameError || emailError || passwordError) return;
    Keyboard.dismiss();
    setNotice(signingUp ? 'Account creation is coming soon.' : 'Sign-in is coming soon.');
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-surface" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View className="flex-1 gap-6 px-6 pb-6">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel="Back"
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
              <TextField label="Name" accessibilityLabel="Name" placeholder="Your name" autoComplete="name" textContentType="name" value={name} onChangeText={setName} error={submitted ? nameError : undefined} />
            ) : null}
            <TextField label="Email" accessibilityLabel="Email" placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" textContentType="emailAddress" value={email} onChangeText={setEmail} error={submitted ? emailError : undefined} />
            <TextField label="Password" accessibilityLabel="Password" placeholder="At least 8 characters" secureTextEntry autoCapitalize="none" autoCorrect={false} autoComplete={signingUp ? 'new-password' : 'current-password'} textContentType={signingUp ? 'newPassword' : 'password'} value={password} onChangeText={setPassword} error={submitted ? passwordError : undefined} returnKeyType="done" onSubmitEditing={submit} />
          </View>
          <Text variant="caption" tone="secondary">Accounts are coming soon. Your details won’t be sent or saved.</Text>
          {notice ? (
            <View accessibilityRole="alert" accessibilityLiveRegion="polite" className="rounded-md bg-info-soft p-4">
              <Text variant="caption" tone="info">{notice}</Text>
            </View>
          ) : null}
          <View className="gap-3">
            <Button label={signingUp ? 'Create account' : 'Sign in'} trailingIcon="arrowRight" onPress={submit} />
            <GoogleButton onPress={() => { Keyboard.dismiss(); setNotice('Google sign-in is coming soon.'); }} />
          </View>
          <PressableScale
            accessibilityRole="link"
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
