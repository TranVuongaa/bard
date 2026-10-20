import { View } from 'react-native';

import { Icon, Text } from '@/components/ui';

export default function TripsScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface px-8">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-lavender">
        <Icon name="trips" size={30} />
      </View>
      <Text variant="title" className="text-center">
        Trips are coming soon
      </Text>
      <Text tone="secondary" className="text-center">
        Your upcoming and past Bard stays will live here.
      </Text>
    </View>
  );
}

