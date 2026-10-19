import {
  TabList,
  type TabListProps,
  TabSlot,
  Tabs,
  TabTrigger,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import type { ComponentRef, Ref } from 'react';
import { Pressable, View } from 'react-native';

import { Icon, Text } from '@/components/ui';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({ children, isFocused, ref, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      ref={ref as Ref<ComponentRef<typeof Pressable>>}
      className="min-h-12 min-w-24 items-center justify-center rounded-full px-5 active:opacity-70">
      <Icon name="home" tone={isFocused ? 'primary' : 'secondary'} size={22} />
      <Text variant="label" tone={isFocused ? 'primary' : 'secondary'}>
        {children}
      </Text>
    </Pressable>
  );
}

function CustomTabList(props: TabListProps) {
  return (
    <View className="absolute bottom-5 w-full flex-row justify-center px-5" {...props}>
      <View className="rounded-full border border-border bg-glass p-1 shadow-glass">
        {props.children}
      </View>
    </View>
  );
}
