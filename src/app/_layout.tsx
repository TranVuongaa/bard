import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import '@/global.css';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

if (!publishableKey) {
  throw new Error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add your key to .env.local.\nRun: 1) clerk auth login  2) clerk link  3) clerk env pull — then restart the dev server.");
}

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 240,
  fade: true,
});

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const [fontsLoaded, fontError] = useFonts({
    'PlusJakartaSans-Regular': require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-SemiBold': require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'PlusJakartaSans-Bold': require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakartaSans-ExtraBold': require('@/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
  });

  const ready = isLoaded && (fontsLoaded || Boolean(fontError));

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={Boolean(isSignedIn)}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="design-system" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
