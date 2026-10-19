import { type StyleProp, View, type ViewStyle } from 'react-native';

import { IconButton } from './icon-button';
import { Icon } from './icons';
import { Text } from './text';

const variants = {
  success: {
    container: 'bg-success-soft',
    icon: 'success' as const,
    tone: 'success' as const,
  },
  danger: {
    container: 'bg-danger-soft',
    icon: 'error' as const,
    tone: 'danger' as const,
  },
} as const;

export function Alert({
  message,
  variant,
  onDismiss,
  className,
  style,
}: {
  message: string;
  variant: keyof typeof variants;
  onDismiss?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const config = variants[variant];

  return (
    <View
      accessibilityRole="alert"
      className={`min-h-14 flex-row items-center gap-3 rounded-md px-4 py-3 ${config.container} ${className ?? ''}`}
      style={style}>
      <Icon name={config.icon} tone={config.tone} size={24} />
      <Text variant="caption" tone={config.tone} className="flex-1">
        {message}
      </Text>
      {onDismiss ? (
        <IconButton icon="close" label="Dismiss alert" size="compact" onPress={onDismiss} className="-m-2" />
      ) : null}
    </View>
  );
}
