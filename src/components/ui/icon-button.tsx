import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

import { Icon, type IconName } from './icons';
import { PressableScale } from './pressable-scale';

export function IconButton({
  icon,
  label,
  size = 'default',
  selected = false,
  className,
  style,
  ...props
}: Omit<PressableProps, 'children' | 'style'> & {
  icon: IconName;
  label: string;
  size?: 'compact' | 'default';
  selected?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <PressableScale
      {...props}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      className={className}
      contentClassName={`${size === 'compact' ? 'h-11 w-11' : 'h-14 w-14'} items-center justify-center rounded-full border ${selected ? 'border-accent bg-accent' : 'border-border bg-surface'}`}
      style={style}>
      <Icon name={icon} size={size === 'compact' ? 20 : 25} />
    </PressableScale>
  );
}
