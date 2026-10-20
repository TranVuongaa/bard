import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInDown, ReduceMotion } from 'react-native-reanimated';

import { LocalSearchField, PropertyList } from '@/components/properties';
import { SafeAreaScreen, Text } from '@/components/ui';
import { rankProperties } from '@/lib/property-search';
import { motion } from '@/theme';

const SEARCH_RESULTS_ENTER = FadeInDown.duration(motion.base).reduceMotion(ReduceMotion.System);

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string | string[] }>();
  const routeQuery = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? '';
  return <SearchContent key={routeQuery} routeQuery={routeQuery} />;
}

function SearchContent({ routeQuery }: { routeQuery: string }) {
  const router = useRouter();
  const [draft, setDraft] = useState(routeQuery);
  const results = rankProperties(routeQuery);

  function submitSearch() {
    router.setParams({ q: draft.trim() });
  }

  function clearSearch() {
    setDraft('');
    router.setParams({ q: '' });
  }

  return (
    <SafeAreaScreen className="bg-surface">
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerClassName="gap-6 px-5 pb-32 pt-5"
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View className="gap-2">
          <Text variant="heading">Search stays</Text>
          <Text tone="secondary">Tell Bard what would make the trip feel right.</Text>
        </View>

        <LocalSearchField
          autoFocus={!routeQuery}
          value={draft}
          onChangeText={setDraft}
          onSubmit={submitSearch}
        />

        <Animated.View key={routeQuery || 'all'} entering={SEARCH_RESULTS_ENTER} className="gap-4">
          <View className="flex-row items-end justify-between gap-4">
            <Text variant="cardTitle" className="flex-1">
              {routeQuery ? 'Best matches' : 'Explore all stays'}
            </Text>
            <Text variant="caption" tone="secondary">
              {results.length} {results.length === 1 ? 'stay' : 'stays'}
            </Text>
          </View>
          <PropertyList properties={results} onClear={routeQuery ? clearSearch : undefined} />
        </Animated.View>
      </ScrollView>
    </SafeAreaScreen>
  );
}

