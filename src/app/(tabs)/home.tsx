import { useUser } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { useRef, useState, type ComponentRef } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import {
  CategoryFilter,
  LocalSearchField,
  ProfileAvatar,
  PropertyList,
} from '@/components/properties';
import { BrandLogo, Icon, IconButton, Text } from '@/components/ui';
import type { PropertyCategory } from '@/data/properties';
import { filterProperties } from '@/lib/property-search';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<PropertyCategory>('all');
  const recommendations = filterProperties(category);
  const firstName = user?.firstName?.trim() || 'traveler';

  function submitSearch() {
    const trimmed = query.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    router.navigate({ pathname: '/search', params: { q: trimmed } });
  }

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerClassName="gap-4 px-5 pb-32 pt-4"
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View className="flex-row items-center justify-between">
        <BrandLogo size="standard" />
        <ProfileAvatar
          imageUrl={user?.imageUrl}
          name={user?.fullName || user?.firstName}
          onPress={() => router.navigate('/profile')}
        />
      </View>

      <View className="gap-2">
        <View className="flex-row items-center gap-2">
          <Text variant="eyebrow" tone="secondary">
            Hey, {firstName}
          </Text>
          <Icon name="wave" tone="accent" size={22} />
        </View>
        <View className="flex-row items-end gap-4">
          <Text variant="homeHero" className="flex-1">
            Find your{`\n`}next stay
          </Text>
          <IconButton
            icon="search"
            label="Focus stay search"
            onPress={() => inputRef.current?.focus()}
          />
        </View>
      </View>

      <LocalSearchField
        ref={inputRef}
        value={query}
        onChangeText={setQuery}
        onSubmit={submitSearch}
        placeholder="quiet pet friendly cabin with hot tub"
      />

      <CategoryFilter value={category} onChange={setCategory} />

      <PropertyList properties={recommendations} />
    </ScrollView>
  );
}
