import { Image } from 'expo-image';
import { styled } from 'nativewind';

import { PressableScale, Text } from '@/components/ui';

const StyledImage = styled(Image, { className: 'style' });

export function GoogleButton({ onPress }: { onPress: () => void }) {
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
      onPress={onPress}
      contentClassName="min-h-13 flex-row items-center justify-center gap-3 rounded-full border border-border bg-surface px-5 py-3">
      <StyledImage
        source={require('@/assets/images/brands/google-g.png')}
        className="h-7 w-7"
        contentFit="contain"
        accessible={false}
      />
      <Text variant="button">Continue with Google</Text>
    </PressableScale>
  );
}
