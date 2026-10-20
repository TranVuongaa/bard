import { View } from 'react-native';

import { Button, Icon, Text } from '@/components/ui';
import type { Property } from '@/data/properties';

import { PropertyCard } from './property-card';

export function PropertyList({
  properties,
  emptyTitle = 'No stays found',
  emptyMessage = 'Try a broader place, style, or price.',
  onClear,
}: {
  properties: readonly Property[];
  emptyTitle?: string;
  emptyMessage?: string;
  onClear?: () => void;
}) {
  if (properties.length === 0) {
    return (
      <View className="items-center gap-4 rounded-surface bg-canvas px-6 py-10">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-lavender">
          <Icon name="search" size={26} />
        </View>
        <Text variant="cardTitle" className="text-center">
          {emptyTitle}
        </Text>
        <Text tone="secondary" className="text-center">
          {emptyMessage}
        </Text>
        {onClear ? <Button label="Show all stays" variant="secondary" onPress={onClear} /> : null}
      </View>
    );
  }

  return (
    <View className="gap-5">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </View>
  );
}

