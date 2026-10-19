import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

import { Icon, type IconName } from './icons';
import { PressableScale } from './pressable-scale';
import { Text } from './text';

export function Chip({
  label,
  selected = false,
  icon,
  className,
  style,
  ...props
}: Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  selected?: boolean;
  icon?: IconName;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <PressableScale
      {...props}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={className}
      contentClassName={`h-11 flex-row items-center justify-center gap-2 rounded-full border px-5 ${selected ? 'border-lavender bg-lavender' : 'border-border bg-canvas'}`}
      style={style}>
      {icon ? <Icon name={icon} size={19} /> : null}
      <Text variant="caption">{label}</Text>
    </PressableScale>
  );
}
