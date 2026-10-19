import { useState, type ReactNode } from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, { cubicBezier, useReducedMotion } from 'react-native-reanimated';

import { motion } from '@/theme';

type PressableScaleProps = Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function PressableScale({
  children,
  className,
  contentClassName,
  style,
  contentStyle,
  disabled,
  onPressIn,
  onPressOut,
  ...props
}: PressableScaleProps) {
  const [pressed, setPressed] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <Pressable
      {...props}
      className={className}
      disabled={disabled}
      hitSlop={props.hitSlop ?? 8}
      pressRetentionOffset={props.pressRetentionOffset ?? 16}
      onPressIn={(event) => {
        setPressed(true);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setPressed(false);
        onPressOut?.(event);
      }}
      style={style}>
      <Animated.View
        className={contentClassName}
        style={[
          {
            transform: [{ scale: pressed && !reduceMotion ? motion.pressScale : 1 }],
            transitionProperty: 'transform',
            transitionDuration: reduceMotion ? '0ms' : `${motion.press}ms`,
            transitionTimingFunction: cubicBezier(...motion.easeOut),
          },
          contentStyle,
        ]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
