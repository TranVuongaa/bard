import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GoogleButton } from '@/components/auth/google-button';
import { useSocialAuth } from '@/hooks/use-social-auth';
import { BrandLogo, Icon, PressableScale, Text } from '@/components/ui';
import { motion } from '@/theme';

import { slides } from './slides';

const StyledImage = styled(Image, { className: 'style' });

function SlideCopy({ slide }: { slide: (typeof slides)[number] }) {
  return (
    <View className="gap-3">
      <Text variant="onboardingHeading" accessibilityRole="header">{slide.title}</Text>
      <Text variant="onboardingBody" tone="secondary">{slide.description}</Text>
    </View>
  );
}

function SizedSlideCopy({ page }: { page: number }) {
  const [heights, setHeights] = useState<number[]>(() => slides.map(() => 0));

  return (
    <View style={{ minHeight: Math.max(0, ...heights) }}>
      {/* Measure every slide at the real content width, including scaled text. */}
      {slides.map((item, index) => (
        <View
          key={item.title}
          pointerEvents="none"
          aria-hidden
          importantForAccessibility="no-hide-descendants"
          className="absolute left-0 right-0 top-0 opacity-0"
          onLayout={({ nativeEvent: { layout } }) => {
            setHeights((previous) => {
              if (previous[index] === layout.height) return previous;
              const next = [...previous];
              next[index] = layout.height;
              return next;
            });
          }}>
          <SlideCopy slide={item} />
        </View>
      ))}
      <View accessibilityLiveRegion="polite">
        <SlideCopy slide={slides[page]} />
      </View>
    </View>
  );
}

export default function OnboardingScreen() {
  const router = useRouter();
  const social = useSocialAuth();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(0);
  const [failedImages, setFailedImages] = useState<ReadonlySet<string>>(() => new Set());
  const { width, fontScale } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const slide = slides[page];
  const openSignUp = () => router.push('/sign-up');

  useEffect(() => {
    // Decorative images must never prevent navigation, even when offline.
    void Image.prefetch(slides.map((item) => item.image), 'memory-disk').catch(() => {});
  }, []);

  return (
    <View className="flex-1 bg-canvas">
      <StatusBar style="dark" />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="min-h-80 flex-1 bg-canvas">
          <StyledImage
            source={{ uri: slide.image }}
            className="absolute inset-0"
            style={{ opacity: failedImages.has(slide.image) ? 0 : 1 }}
            contentFit="cover"
            contentPosition="center"
            transition={{ duration: reduceMotion ? 0 : motion.base, effect: 'cross-dissolve' }}
            onError={() => setFailedImages((previous) => new Set(previous).add(slide.image))}
            onLoad={() => setFailedImages((previous) => {
              if (!previous.has(slide.image)) return previous;
              const next = new Set(previous);
              next.delete(slide.image);
              return next;
            })}
            accessible={false}
          />
          <View
            className="flex-row items-center justify-between px-6 pt-3"
            style={{ marginTop: insets.top }}>
            <BrandLogo className="rounded-md bg-glass" />
            <PressableScale
              accessibilityRole="button"
              accessibilityLabel="Skip onboarding"
              onPress={openSignUp}
              contentClassName="min-h-11 items-center justify-center rounded-full bg-glass px-5">
              <Text variant="caption">Skip</Text>
            </PressableScale>
          </View>
          <View className="flex-1" />
          <View className="items-start px-6 pb-12 pt-24">
            <View className="flex-row items-center gap-2 rounded-full border border-glass bg-scrim px-3 py-2">
              <Icon name="location" tone="inverse" size={18} />
              <Text variant="caption" tone="inverse">{slide.caption}</Text>
            </View>
          </View>
        </View>
        <View className="bg-surface px-7 pb-4" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
          <View pointerEvents="none" className="onboarding-curve absolute -top-6 left-0 right-0 h-24 bg-surface" />
          <View className="flex-row gap-1">
            {slides.map((item, index) => (
              <PressableScale
                key={item.title}
                accessibilityRole="button"
                accessibilityLabel={`Slide ${index + 1} of ${slides.length}`}
                accessibilityState={{ selected: page === index }}
                hitSlop={0}
                onPress={() => setPage(index)}
                contentClassName="h-11 w-11 items-start justify-center">
                <View className={`h-1 w-8 rounded-full ${page === index ? 'bg-lavender' : 'bg-canvas'}`} />
              </PressableScale>
            ))}
          </View>
          <SizedSlideCopy key={`${width}:${fontScale}`} page={page} />
          <View className="mt-4 gap-2">
            <PressableScale
              accessibilityRole="button"
              accessibilityLabel={slide.button}
              onPress={() => page < slides.length - 1 ? setPage(page + 1) : openSignUp()}
              contentClassName="min-h-13 flex-row items-center rounded-full bg-accent px-6 py-3">
              <View className="w-6" />
              <Text variant="button" className="flex-1 text-center">{slide.button}</Text>
              <Icon name="arrowRight" size={24} />
            </PressableScale>
            <GoogleButton disabled={social.busy} onPress={() => void social.start('oauth_google')} />
            {social.error ? <Text variant="caption" tone="danger" accessibilityRole="alert">{social.error}</Text> : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
