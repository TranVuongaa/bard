import { ActivityIndicator, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IconName } from './icons';
import { PressableScale } from './pressable-scale';
import { Text } from './text';

const variantClasses = {
  primary: 'bg-accent',
  secondary: 'border border-border bg-surface',
} as const;

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: keyof typeof variantClasses;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  loading?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  variant = 'primary',
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled,
  className,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <PressableScale
      {...props}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      className={className}
      contentClassName={`h-14 flex-row items-center justify-center gap-3 rounded-full px-6 ${variantClasses[variant]} ${isDisabled ? 'opacity-40' : ''}`}
      disabled={isDisabled}
      style={style}>
      {loading ? (
        <ActivityIndicator className="text-ink" />
      ) : (
        <>
          {leadingIcon ? <Icon name={leadingIcon} size={22} /> : null}
          <Text variant="button">{label}</Text>
          {trailingIcon ? <Icon name={trailingIcon} size={22} /> : null}
        </>
      )}
    </PressableScale>
  );
}
