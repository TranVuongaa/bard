# 09 · Safe-area layouts

Status: done

## Goal

Keep every route-level screen's interactive and readable content out of display cutouts, status bars, rounded screen edges, and the home indicator while preserving the native tab bar's own inset behavior.

## Decisions

- Use the already-installed `react-native-safe-area-context` package; add no dependency and do not add another `SafeAreaProvider`, because Expo Router supplies it.
- Add a reusable route-level safe-area container in `src/components/ui/` because Home, Search, Trips, Profile, and the design-system preview share the same boundary concern.
- Tab screens apply top, left, and right safe-area edges only. Expo Router Native Tabs continues to own the bottom inset so content is not padded twice.
- Scroll views remain the first scrollable descendant of each tab screen and retain automatic native-tab content inset adjustment for the tab bar.
- Auth, verification, and onboarding keep their existing `useSafeAreaInsets` implementations because their inset values are intentionally combined with custom, keyboard-aware, and image-led layouts.
- Web keeps its current layout: Expo Router SDK 58 reports zero safe-area values on web, and this task does not introduce a new web CSS safe-area policy.

## Out of scope

- Changing tab-bar appearance, navigation structure, status-bar styling, or screen spacing unrelated to device insets.
- Replacing the custom inset calculations already used by onboarding and authentication.
- Adding landscape-specific redesigns beyond respecting left and right safe-area edges.

## Steps

### 1. Add a shared safe-area screen primitive

Create a small component in `src/components/ui/` backed by `SafeAreaView` from `react-native-safe-area-context`. Give it a full-height layout, accept children and layout-only `className`/`style`, and expose an edge choice appropriate for tab screens versus standalone stack screens. Export it from the UI barrel. Keep colors and spacing owned by the screen so the primitive only owns the device boundary.

### 2. Protect the tab routes

Wrap `src/app/(tabs)/home.tsx`, `search.tsx`, `trips.tsx`, and `profile.tsx` in the shared safe-area boundary. Apply top, left, and right edges while leaving the bottom to Expo Router Native Tabs. Preserve each scroll view's keyboard behavior, automatic content inset adjustment, pull/scroll behavior, existing padding, and direct screen semantics.

### 3. Protect the standalone design-system route

Wrap the design-system gallery at its route boundary with all four safe-area edges because it is presented outside the tab navigator. Preserve its scroll-to-offset behavior and existing gallery spacing.

### 4. Record and verify the convention

Update `AGENTS.md` in the Design system section with the lasting ownership rule: route screens use the shared safe-area boundary, tab screens exclude the bottom edge because Native Tabs owns it, and custom full-screen layouts may use inset hooks when they must combine values. Run lint and TypeScript, then inspect the affected screens in the iOS simulator and verify at least one Android-capable layout path if an Android emulator is available.

## Verification

- Run `npx expo lint`.
- Run `npx tsc --noEmit`.
- Open Home, Search, Trips, and Profile in the iOS simulator and confirm top content clears the status area, side content stays inside the display bounds, and bottom content/tab spacing is not doubled.
- Open `/design-system` and confirm its first and last content clear the top and bottom system areas.
- Rotate a supported simulator to landscape and confirm left/right content clears rounded corners or cutouts.
- If an Android emulator is available, open all four tabs and confirm the status bar no longer overlaps content while the native tab bar still has a single bottom inset.
- Recheck sign-in, verification, and onboarding to confirm their existing safe-area spacing is unchanged.

## AGENTS.md updates

In **Design system**, add the safe-area ownership rule described in step 4. It does not replace an existing rule.

## Result

Added a shared `SafeAreaScreen` and applied it to Home, Search, Trips, Profile, and the standalone design-system preview. Tab routes protect the top and sides while leaving the bottom inset to Native Tabs; the preview protects all four edges. Existing custom auth and onboarding inset handling remains unchanged. Lint and TypeScript pass, and iOS simulator inspection confirmed the signed-in Home and Search layouts clear the status area without adding a second bottom inset. The design-system Expo Go deep link did not resolve to that standalone route, Android was unavailable, and landscape is disabled by the app's portrait-only orientation, so those visual checks remain manual.
