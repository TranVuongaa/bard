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
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>
    </StyledNativeTabs>
  );
}
