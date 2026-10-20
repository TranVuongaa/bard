import { Image } from 'expo-image';
import { styled } from 'nativewind';
import { View } from 'react-native';

import { PressableScale, Text } from '@/components/ui';

const StyledImage = styled(Image, { className: 'style' });

export function ProfileAvatar({
  imageUrl,
  name,
  onPress,
}: {
  imageUrl?: string | null;
  name?: string | null;
  onPress?: () => void;
}) {
  const initial = name?.trim().charAt(0).toLocaleUpperCase() || 'B';
  const avatar = imageUrl ? (
    <StyledImage
      accessible
      accessibilityLabel={name ? `${name}'s profile photo` : 'Profile photo'}
      cachePolicy="memory-disk"
      className="h-full w-full"
      contentFit="cover"
      source={imageUrl}
    />
  ) : (
    <View className="h-full w-full items-center justify-center">
      <Text variant="title">{initial}</Text>
    </View>
  );

  if (!onPress) {
    return <View className="h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-accent">{avatar}</View>;
  }

  return (
    <PressableScale
      accessibilityLabel="Open profile"
      accessibilityRole="button"
      contentClassName="h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-accent"
      onPress={onPress}>
      {avatar}
    </PressableScale>
  );
}

