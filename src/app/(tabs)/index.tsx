import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-canvas px-5">
      <Text variant="heading" className="text-center">
        HomeScreen
      </Text>
      <Button
        label="Open design system"
        trailingIcon="arrowRight"
        className="w-full"
        onPress={() => router.push('/design-system')}
      />
    </View>
  );
}
