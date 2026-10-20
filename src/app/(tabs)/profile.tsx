import { useClerk, useUser } from '@clerk/expo';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { ProfileAvatar } from '@/components/properties';
import { Alert, Button, Text } from '@/components/ui';
import { authError } from '@/lib/auth/errors';

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const { user } = useUser();
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
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerClassName="flex-grow gap-8 px-5 pb-32 pt-8"
      contentInsetAdjustmentBehavior="always">
      <View className="items-center gap-4">
        <ProfileAvatar
          imageUrl={user?.imageUrl}
          name={user?.fullName || user?.firstName}
        />
        <View className="items-center gap-1">
          <Text variant="title">{user?.fullName || user?.firstName || 'Bard guest'}</Text>
          <Text
            tone="secondary"
            className="w-full text-center"
            ellipsizeMode="middle"
            numberOfLines={1}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>

      {error ? <Alert message={error} variant="danger" onDismiss={() => setError('')} /> : null}

      <View className="mb-8 mt-auto">
        <Button
          label="Sign out"
          variant="secondary"
          loading={busy}
          className="w-full"
          onPress={logout}
        />
      </View>
    </ScrollView>
  );
}

