import { type StyleProp, View, type ViewStyle } from 'react-native';

import { IconButton } from './icon-button';
import { Text } from './text';

export function Stepper({
  value,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  label = 'Quantity',
  className,
  style,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      accessibilityLabel={`${label}: ${value}`}
      className={`h-14 flex-row items-center rounded-full border border-border bg-surface px-1 ${className ?? ''}`}
      style={style}>
      <IconButton
        icon="minus"
        label={`Decrease ${label}`}
        disabled={value <= min}
        onPress={() => onChange(Math.max(min, value - 1))}
      />
      <Text variant="bodyMedium" className="min-w-10 text-center">
        {value}
      </Text>
      <IconButton
        icon="plus"
        label={`Increase ${label}`}
        disabled={value >= max}
        onPress={() => onChange(Math.min(max, value + 1))}
      />
    </View>
  );
}
