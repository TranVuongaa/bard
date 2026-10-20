# Consistent onboarding panel and smooth photos

Status: done

## Goal
Keep the white panel the same height across all three onboarding slides at a given screen width and text size, and smoothly crossfade between their photos.

## Current implementation
- Expo ~58.0.16; expo-image ~58.0.16 and Reanimated 4.7.1 are already installed.
- `src/components/onboarding/onboarding-screen.tsx` renders a flexible hero above a content-sized white panel.
- Descriptions in `slides.ts` wrap to different heights, moving the panel boundary and buttons.
- The photo has `key={slide.image}`, forcing a remount on every selection.
- Existing onboarding work is uncommitted; preserve it and its copy, assets, navigation and styling.
- `prompts/TEMPLATE.md` is absent. This plan uses the structure of `03-onboarding.md`.

## Design and defaults
- Preserve the existing curved white panel, typography, spacing, progress controls, photo crop, captions and buttons.
- Reserve the maximum height needed by all three title/description groups at the current width and font scale. Measure hidden, noninteractive, accessibility-hidden copies; recompute when dimensions or text scale change. Show only the active copy to assistive technology.
- Keep the panel boundary and button positions fixed between slides; retain scrolling and the hero minimum height for small screens and large text.
- Purpose: preventing a jarring change during occasional onboarding navigation.
- Keep one Expo Image instance and use its native cross-dissolve transition when the source changes, using `motion.base` (240 ms). Prefetch the three existing URLs, handling failures without blocking navigation.
- Respect Reduce Motion with an immediate photo change. Handle failed images with the existing neutral fallback, guarding against stale callbacks during rapid navigation.
- No new tokens, dependencies, services, gestures or automatic slide advance.

## Implementation
1. Update `src/components/onboarding/onboarding-screen.tsx` with measured shared copy height and stable image identity, transition and prefetch behavior.
2. Reuse `src/theme/motion.ts` values. Extract an onboarding-local helper only if needed for clarity.
3. Verify the layout and interaction in the iOS simulator, correcting any regressions.
4. Record lasting onboarding behavior in AGENTS.md and results here.

## Documentation
- Expo SDK 58: https://docs.expo.dev/versions/v58.0.0/
- Expo Image transitions and prefetch: https://docs.expo.dev/versions/v58.0.0/sdk/image/
- Read the project's expo-animation skill; use the existing image component's native transition for image source changes.
- Confirm any additional React Native or Reanimated APIs against their current documentation before implementation.

## Verification
- Run `npx expo lint`, `npx tsc --noEmit`, and `git diff --check`.
- Open `/onboarding` in the iOS simulator and capture each slide. Compare panel top and button positions at the same viewport.
- Check progress controls, Next, Skip, final sign-up navigation and rapid repeated slide selection.
- Check a smaller viewport, enlarged text, Reduce Motion, and image failure behavior.
- Compare with `assets/prompt-images/onboarding.png` for unintended styling changes. No new screenshot-derived dimensions are proposed.
- Simulator inspection verifies layout, not release-device animation performance; explicitly report any unrun device checks.

## Reporting
Use the Done, Verified, You need to, Test it yourself and Notes sections required by AGENTS.md. Include screenshot evidence and distinguish simulator checks from release-device feel checks.

## Result
- Implemented shared measured copy height, recalculated on width/font-scale changes, in `onboarding-screen.tsx`. Hidden measurement copies are noninteractive and hidden from accessibility.
- Kept the image mounted across source changes, added a native 240 ms cross-dissolve and background prefetch, and tracked failures per image. Reduce Motion disables the transition.
- Lint, TypeScript and diff whitespace checks passed.
- Captured and visually compared all three slides on the iPhone 17 Pro simulator: `/tmp/bard-onboarding-check/slide-1.png`, `slide-2.png`, `slide-3.png`. Panel curves, progress controls and buttons align across all three. Slides two and three used temporary initial-state previews because no simulator interaction tool is available; these previews were removed and initial slide zero restored.
- Checked slide one at extra-extra-extra-large text (`/tmp/bard-onboarding-check/large-text.png`); copy and buttons remain visible. Restored simulator text size to its original `large` setting.
- Compared the first slide to the supplied reference. Existing differences remain: Bard text branding, alternate photo/caption, font appearance, panel proportions/curve and progress spacing. This task adds no estimated design dimensions.
- Not verified: taps and rapid navigation, smaller-device layout, simulated image failure, Reduce Motion behavior on device, or release-device animation feel. UI automation was unavailable; screenshots establish static layout only.
