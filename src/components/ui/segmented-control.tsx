import { type StyleProp, View, type ViewStyle } from 'react-native';

import { Icon, type IconName } from './icons';
import { PressableScale } from './pressable-scale';
import { Text } from './text';

export type Segment = {
  value: string;
  label: string;
  icon?: IconName;
};

export function SegmentedControl({
  segments,
  value,
  onChange,
  className,
  style,
}: {
  segments: readonly Segment[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      accessibilityRole="tablist"
      className={`h-14 flex-row rounded-full border border-border bg-canvas p-1 ${className ?? ''}`}
      style={style}>
      {segments.map((segment) => {
        const selected = segment.value === value;
        return (
          <PressableScale
            key={segment.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            className="flex-1"
            contentClassName={`h-12 flex-row items-center justify-center gap-2 rounded-full ${selected ? 'bg-ink' : ''}`}
            onPress={() => onChange(segment.value)}>
            {segment.icon ? (
              <Icon name={segment.icon} tone={selected ? 'inverse' : 'primary'} size={20} />
            ) : null}
            <Text variant="caption" tone={selected ? 'inverse' : 'primary'}>
              {segment.label}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}
