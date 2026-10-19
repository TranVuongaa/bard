import { useLocalSearchParams } from 'expo-router';

import { DesignSystemGallery } from '@/components/design-system/design-system-gallery';

export default function DesignSystemScreen() {
  const { y } = useLocalSearchParams<{ y?: string }>();
  const offset = Number(y);

  return <DesignSystemGallery initialOffset={Number.isFinite(offset) && offset > 0 ? offset : 0} />;
}
