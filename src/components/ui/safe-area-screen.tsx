import { styled } from 'nativewind';
import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  type Edge,
} from 'react-native-safe-area-context';

const TAB_SCREEN_EDGES: Edge[] = ['top', 'right', 'left'];
const ALL_EDGES: Edge[] = ['top', 'right', 'bottom', 'left'];

const StyledSafeAreaView = styled(SafeAreaView, { className: 'style' });

type SafeAreaScreenProps = PropsWithChildren<{
  className?: string;
  includeBottom?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

export function SafeAreaScreen({
  children,
  className,
  includeBottom = false,
  style,
}: SafeAreaScreenProps) {
  return (
    <StyledSafeAreaView
      className={`flex-1 ${className ?? ''}`}
      edges={includeBottom ? ALL_EDGES : TAB_SCREEN_EDGES}
      style={style}>
      {children}
    </StyledSafeAreaView>
  );
}
