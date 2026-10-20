import { NativeTabs } from 'expo-router/native-tabs';
import { styled } from 'nativewind';

const StyledNativeTabs = styled(NativeTabs, {
  className: {
    target: false,
    nativeStyleMapping: {
      backgroundColor: 'backgroundColor',
      borderColor: 'indicatorColor',
      color: 'tintColor',
    },
  },
});

export default function AppTabs() {
  return (
    <StyledNativeTabs className="border-canvas bg-surface text-accent">
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="trips">
        <NativeTabs.Trigger.Label>Trips</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'person', selected: 'person.fill' }} md="person" />
      </NativeTabs.Trigger>
    </StyledNativeTabs>
  );
}
