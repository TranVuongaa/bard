import { View } from 'react-native';

import { Icon, type IconName, PressableScale, Text } from '@/components/ui';
import type { PropertyCategory } from '@/data/properties';

const categories: readonly {
  value: PropertyCategory;
  label: string;
  icon: IconName;
}[] = [
  { value: 'all', label: 'All stays', icon: 'home' },
  { value: 'cabin', label: 'Cabins', icon: 'cabin' },
  { value: 'beach', label: 'Beach', icon: 'beach' },
  { value: 'city', label: 'City', icon: 'city' },
  { value: 'villa', label: 'Villas', icon: 'villa' },
];

export function CategoryFilter({
  value,
  onChange,
}: {
  value: PropertyCategory;
  onChange: (category: PropertyCategory) => void;
}) {
  return (
    <View accessibilityRole="radiogroup" className="flex-row flex-wrap gap-2">
      {categories.map((category) => {
        const selected = value === category.value;
        return (
          <PressableScale
            key={category.value}
            accessibilityLabel={`Show ${category.label.toLocaleLowerCase()}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            contentClassName={`h-11 flex-row items-center gap-2 rounded-full px-4 ${selected ? 'bg-accent' : 'bg-canvas'}`}
            onPress={() => onChange(category.value)}>
            <Icon name={category.icon} size={19} />
            <Text variant="bodyMedium">{category.label}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

