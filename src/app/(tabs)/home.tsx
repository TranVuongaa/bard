import { useRouter } from 'expo-router';
import { useClerk, useUser } from '@clerk/expo';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';
import { authError } from '@/lib/auth/errors';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function logout() {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await signOut();
    } catch (cause) {
      setError(authError(cause));
    } finally {
      setBusy(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-canvas px-5">
      <Text variant="heading" className="text-center">
        Welcome{user?.firstName ? `, ${user.firstName}` : ''}
      </Text>
      <Button
        label="Open design system"
        trailingIcon="arrowRight"
        className="w-full"
        onPress={() => router.push('/design-system')}
      />
      <Text tone="secondary">{user?.primaryEmailAddress?.emailAddress}</Text>
      {error ? <Text tone="danger" accessibilityRole="alert">{error}</Text> : null}
      <Button label="Sign out" variant="secondary" loading={busy} className="w-full" onPress={logout} />
    </View>
  );
}
