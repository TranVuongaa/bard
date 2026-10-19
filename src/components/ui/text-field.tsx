import { useState } from 'react';
import {
  TextInput,
  type TextInputProps,
  type StyleProp,
  type TextStyle,
  View,
} from 'react-native';

import { Icon, type IconName } from './icons';
import { Text } from './text';

export type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  icon?: IconName;
  trailingIcon?: IconName;
  error?: string;
  className?: string;
  style?: StyleProp<TextStyle>;
};

export function TextField({
  label,
  icon,
  trailingIcon,
  error,
  className,
  style,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className={`gap-2 ${className ?? ''}`}>
      {label ? <Text variant="caption">{label}</Text> : null}
      <View
        className={`h-14 flex-row items-center gap-3 rounded-field bg-canvas px-4 ${
          error
            ? 'border-2 border-danger'
            : focused
              ? 'border-2 border-lavender'
              : 'border border-border'
        }`}>
        {icon ? <Icon name={icon} size={24} /> : null}
        <TextInput
          {...props}
          className="text-input flex-1 p-0 placeholder:text-muted"
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          style={style}
        />
        {trailingIcon ? <Icon name={trailingIcon} tone="secondary" size={22} /> : null}
      </View>
      {error ? (
        <Text variant="label" tone="danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
