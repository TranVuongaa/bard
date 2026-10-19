import { type ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';

import { Icon } from './icons';
import { Text } from './text';

const toneClasses = {
  favorite: 'bg-favorite-soft',
  success: 'bg-success-soft',
  discount: 'bg-discount-soft',
  info: 'bg-info-soft',
  neutral: 'bg-canvas',
} as const;

export function Badge({
  children,
  tone = 'neutral',
  favorite = false,
  className,
  style,
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
  favorite?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      className={`h-9 flex-row items-center justify-center gap-2 rounded-full px-4 ${toneClasses[tone]} ${className ?? ''}`}
      style={style}>
      {favorite ? <Icon name="star" size={19} /> : null}
      <Text variant="caption">{children}</Text>
    </View>
  );
}
