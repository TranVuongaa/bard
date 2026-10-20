import { SymbolView } from 'expo-symbols';
import { styled } from 'nativewind';
import type { ComponentProps } from 'react';
import { Platform, type StyleProp, View, type ViewStyle } from 'react-native';

const StyledSymbolView = styled(SymbolView, {
  className: {
    target: false,
    nativeStyleMapping: {
      color: 'tintColor',
    },
  },
});

const symbols = {
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  heart: { ios: 'heart', android: 'favorite', web: 'favorite' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  profile: { ios: 'person', android: 'person', web: 'person' },
  settings: { ios: 'gearshape', android: 'settings', web: 'settings' },
  location: { ios: 'mappin', android: 'location_on', web: 'location_on' },
  filters: { ios: 'slider.horizontal.3', android: 'tune', web: 'tune' },
  share: { ios: 'square.and.arrow.up', android: 'share', web: 'share' },
  bookmark: { ios: 'bookmark', android: 'bookmark', web: 'bookmark' },
  policies: { ios: 'text.document', android: 'policy', web: 'policy' },
  document: { ios: 'doc.text', android: 'description', web: 'description' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  payments: { ios: 'creditcard', android: 'credit_card', web: 'credit_card' },
  trips: { ios: 'suitcase', android: 'luggage', web: 'luggage' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  hidden: { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' },
  minus: { ios: 'minus', android: 'remove', web: 'remove' },
  plus: { ios: 'plus', android: 'add', web: 'add' },
  arrowRight: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  success: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  error: { ios: 'exclamationmark.circle.fill', android: 'error', web: 'error' },
  pets: { ios: 'pawprint.fill', android: 'pets', web: 'pets' },
  hotTub: { ios: 'bubbles.and.sparkles.fill', android: 'hot_tub', web: 'hot_tub' },
  list: { ios: 'list.bullet', android: 'list', web: 'list' },
  map: { ios: 'map', android: 'map', web: 'map' },
  sparkles: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  arrowUpRight: { ios: 'arrow.up.right', android: 'north_east', web: 'north_east' },
  cabin: { ios: 'tree.fill', android: 'forest', web: 'forest' },
  beach: { ios: 'water.waves', android: 'waves', web: 'waves' },
  city: { ios: 'building.2.fill', android: 'apartment', web: 'apartment' },
  villa: { ios: 'sun.max.fill', android: 'villa', web: 'villa' },
  wave: { ios: 'hand.wave.fill', android: 'waving_hand', web: 'waving_hand' },
} as const satisfies Record<string, ComponentProps<typeof SymbolView>['name']>;

const toneVariables = {
  primary: 'text-ink',
  secondary: 'text-muted',
  inverse: 'text-surface',
  accent: 'text-accent',
  success: 'text-success',
  danger: 'text-danger',
  info: 'text-info',
} as const;

export type IconName = keyof typeof symbols;
export type IconTone = keyof typeof toneVariables;

export function Icon({
  name,
  tone = 'primary',
  size = 24,
  className,
  style,
}: {
  name: IconName;
  tone?: IconTone;
  size?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View className={className} style={[{ width: size, height: size }, style]}>
      {Platform.OS === 'web' ? (
        <SymbolView
          tintColor={`var(--color-${toneVariables[tone].replace('text-', '')})`}
          name={symbols[name]}
          size={size}
        />
      ) : (
        <StyledSymbolView className={toneVariables[tone]} name={symbols[name]} size={size} />
      )}
    </View>
  );
}
