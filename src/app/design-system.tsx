import { useLocalSearchParams } from 'expo-router';

import { DesignSystemGallery } from '@/components/design-system/design-system-gallery';
import { SafeAreaScreen } from '@/components/ui';

export default function DesignSystemScreen() {
  const { y } = useLocalSearchParams<{ y?: string }>();
  const offset = Number(y);

  return (
    <SafeAreaScreen includeBottom className="bg-canvas">
      <DesignSystemGallery initialOffset={Number.isFinite(offset) && offset > 0 ? offset : 0} />
    </SafeAreaScreen>
  );
}
