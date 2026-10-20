import { forwardRef, type ComponentRef } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { Icon, PressableScale } from '@/components/ui';

type LocalSearchFieldProps = Pick<
  TextInputProps,
  'autoFocus' | 'onChangeText' | 'onSubmitEditing' | 'value'
> & {
  onSubmit: () => void;
  placeholder?: string;
};

export const LocalSearchField = forwardRef<ComponentRef<typeof TextInput>, LocalSearchFieldProps>(
  function LocalSearchField(
    {
      autoFocus,
      onChangeText,
      onSubmit,
      onSubmitEditing,
      placeholder = 'Describe your perfect stay',
      value,
    },
    ref,
  ) {
    return (
      <View className="h-14 flex-row items-center gap-3 rounded-surface bg-lavender p-2 pl-4 shadow-card">
        <Icon name="sparkles" size={24} />
        <TextInput
          ref={ref}
          accessibilityLabel="Describe your perfect stay"
          autoCapitalize="sentences"
          autoCorrect
          autoFocus={autoFocus}
          className="text-input h-10 flex-1 p-0 placeholder:text-muted"
          enterKeyHint="search"
          onChangeText={onChangeText}
          onSubmitEditing={(event) => {
            onSubmitEditing?.(event);
            onSubmit();
          }}
          placeholder={placeholder}
          returnKeyType="search"
          value={value}
        />
        <PressableScale
          accessibilityLabel="Search stays"
          accessibilityRole="button"
          contentClassName="h-10 w-10 items-center justify-center rounded-full bg-surface"
          onPress={onSubmit}>
          <Icon name="arrowUpRight" size={25} />
        </PressableScale>
      </View>
    );
  },
);

