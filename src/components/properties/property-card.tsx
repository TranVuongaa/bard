import { Image } from 'expo-image';
import { styled } from 'nativewind';
import { useReducedMotion } from 'react-native-reanimated';
import { View } from 'react-native';

import { Icon, Text } from '@/components/ui';
import type { Property } from '@/data/properties';
import { motion } from '@/theme';

const StyledImage = styled(Image, { className: 'style' });

export function PropertyCard({ property }: { property: Property }) {
  const reduceMotion = useReducedMotion();

  return (
    <View
      accessibilityLabel={`${property.title}, ${property.location}, rated ${property.rating}, ${property.nightlyPrice} dollars per night`}
      className="aspect-stay-card overflow-hidden rounded-card bg-image-placeholder shadow-card">
      <StyledImage
        alt={`${property.title} in ${property.location}`}
        cachePolicy="memory-disk"
        className="absolute inset-0"
        contentFit="cover"
        placeholder={{ blurhash: property.blurhash }}
        recyclingKey={property.id}
        source={property.imageUrl}
        transition={reduceMotion ? 0 : motion.base}
      />
      <View className="absolute inset-0 bg-ink/10" />
      <View className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink/95 via-ink/60 to-transparent" />

      <View className="absolute right-4 top-4 flex-row items-center gap-2 rounded-full bg-surface px-4 py-3 shadow-raised">
        <Icon name="star" size={20} />
        <Text variant="button">{property.rating.toFixed(1)}</Text>
      </View>

      <View className="absolute inset-x-0 bottom-0 gap-2 p-5">
        <View className="flex-row items-center gap-2">
          <Icon name="location" tone="inverse" size={21} />
          <Text variant="caption" tone="inverse" className="flex-1">
            {property.location}
          </Text>
        </View>
        <Text variant="cardTitle" tone="inverse">
          {property.title}
        </Text>
        <Text variant="label" tone="inverse">
          From ${property.nightlyPrice} / night
        </Text>
      </View>
    </View>
  );
}

