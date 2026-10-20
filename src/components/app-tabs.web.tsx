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
          <TabTrigger name="home" href="/home" asChild>
            <TabButton icon="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="search" href="/search" asChild>
            <TabButton icon="search">Search</TabButton>
          </TabTrigger>
          <TabTrigger name="trips" href="/trips" asChild>
            <TabButton icon="calendar">Trips</TabButton>
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="profile">Profile</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  children,
  icon,
  isFocused,
  ref,
  ...props
}: TabTriggerSlotProps & { icon: 'home' | 'search' | 'calendar' | 'profile' }) {
  return (
    <Pressable
      {...props}
      ref={ref as Ref<ComponentRef<typeof Pressable>>}
      className="min-h-12 flex-1 items-center justify-center rounded-full px-2 active:opacity-70">
      <Icon name={icon} tone={isFocused ? 'primary' : 'secondary'} size={22} />
      <Text variant="label" tone={isFocused ? 'primary' : 'secondary'}>
        {children}
      </Text>
    </Pressable>
  );
}

function CustomTabList(props: TabListProps) {
  return (
    <View className="absolute bottom-5 w-full flex-row justify-center px-5" {...props}>
      <View className="w-full flex-row rounded-full border border-border bg-glass p-1 shadow-glass">
        {props.children}
      </View>
    </View>
  );
}
