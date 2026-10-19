# Bard design system

Status: done

## Goal
Implement the reusable light-mode design system shown in `assets/prompt-images/design.png`: Plus Jakarta Sans typography, the reference palette, a 4px spacing system, radii, shadows, motion, core controls, and a `/design-system` gallery that makes the system reviewable on iOS and web.

## Source and constraints
- The reference is a design-system board, not a single product screen. Reproduce its visual language and component states in a mobile gallery; do not copy the sample `roam` name into Bard.
- NativeWind v5 and Tailwind v4 are already configured. All CSS-backed tokens live in `src/global.css` under `@theme`; do not create a parallel JS color/spacing system.
- `AGENTS.md` selects Plus Jakarta Sans for the reference's geometric sans. Add static TTF assets under `assets/fonts/` and load them with `useFonts` before hiding the splash. Do not add a font package.
- Keep native controls native. In particular, use `Switch` rather than recreating the reference toggle.
- Interactive feedback follows the expo-animation press recipe: 0.97 scale, 120ms, ease-out, transform only, Reduce Motion respected. Tabs use platform behavior and do not animate.
- Preserve unrelated user changes and the existing `/` screen content.

## Design tokens

### Exact values printed in the reference
- `accent`: `#FFC629`
- `lavender`: `#C9B4FE`
- `ink`: `#0B0B1A`
- `muted`: `#6B7280`
- `surface`: `#FFFFFF`
- `canvas`: `#F4F5F7`
- `border`: `#E5E7EB`
- `glass`: `rgba(255, 255, 255, 0.7)`

### Proposed supporting colors estimated from the reference
- `accent-pressed`: `#EFB313`; focused controls continue to use `lavender`.
- Success: `#138A5B` on `#E2F5EC`.
- Danger: `#E93445` on `#FFE3EA`.
- Info: `#1849A9` on `#E8EEFF`.
- Favorite/warning surface: `#FFF6D8`; discount surface: `#FFE5ED`.
- Scrim: `rgba(11, 11, 26, 0.4)`.

These supporting values will be checked visually against the image and adjusted before completion. All color use outside `global.css` will be through token utilities or token-backed component tone mappings.

### Typography
Vendor Plus Jakarta Sans Regular 400, Medium 500, SemiBold 600, Bold 700, and ExtraBold 800 static TTFs with their OFL license. Expose family utilities so weight always comes from a font family rather than `font-bold`.

- `display`: 56px / 1.0, ExtraBold.
- `heading`: 32px / 1.2, Bold.
- `title`: 28px / 1.2, Bold.
- `cardTitle`: 20px / 1.2, Bold.
- `body`: 16px / 1.5, Regular.
- `bodyMedium`: 16px / 1.5, Medium.
- `button`: 17px / 1.2, SemiBold.
- `caption`: 14px / 1.4, Medium.
- `label`: 12px / 1.35, Medium.

Line-height tokens use unitless ratios as required by NativeWind v5. Text remains Dynamic Type compatible.

### Layout and effects
- Keep Tailwind's `--spacing: 4px`; use 4, 8, 12, 16, 20, 24, 32, 40, 48 and 64px steps from that scale. Default screen edge padding is 20px on phones and 24px in wide gallery sections.
- Radii: 8px small, 12px medium, 16px field, 20px card, 28px large surface, and full pill/circle.
- Borders: 1px default and 2px focus ring.
- Heights: 56px buttons/fields, 44px chips and compact controls, minimum 44pt touch targets.
- Shadows: a subtle card shadow, a raised floating-control shadow, and a stronger glass/navigation shadow derived from the soft reference rendering.
- JS-only motion values live in `src/theme/motion.ts`.

## Shared primitives
- Replace the starter `ThemedText`/`ThemedView` color system with `src/components/ui/text.tsx` and token utilities. `<Text variant tone>` owns font family, size, line height and color; callers use `className` only for layout and merge `style` last.
- Add `src/components/ui/icons.tsx` with an explicit app icon registry backed by `expo-symbols`. Include the reference set needed by buttons, fields, chips, alerts, rows and the gallery; icon color is a `tone` prop.
- Add `PressableScale`, `Button`, `IconButton`, `TextField`, `Chip`, `Badge`, `Alert`, `SegmentedControl`, and `Stepper` in `src/components/ui/`. Each exposes only variants/states demonstrated by the reference, supports disabled/accessibility state, takes layout-only `className`, and merges `style` last.
- Use a native `Switch` with token-backed colors in the gallery. Do not create a wrapper until two product screens need one.
- Listing, policy and profile examples remain compositions in the gallery rather than new primitives. Their repeated building blocks come from the shared components.
- Keep the native bottom tab bar. Apply reference accent/text tokens where the native API supports them; do not simulate the yellow selected pill that native tabs cannot draw.

## Routes and app shell
- Introduce a root `Stack` with a `(tabs)` group so `/design-system` can sit outside NativeTabs and remain reachable without becoming a tab.
- Move the current index route into `(tabs)` without changing its visible content. Put the existing native/web tab layouts in `(tabs)/_layout` via the current `AppTabs` components.
- Add `src/app/design-system.tsx` as a thin route and keep its gallery implementation outside `src/app/`.
- Support `?y=<offset>` by scrolling the gallery to the requested vertical offset after layout.
- Set `userInterfaceStyle` to `light`, use the light navigation theme, and hold the native splash until fonts are ready or font loading returns an error.

## Legacy migration
- Migrate the currently rendered app shell from `src/constants/theme.ts`, `ThemedText`, and `ThemedView` to the new tokens/primitives so two styling systems do not remain active.
- Retain unused starter files unless they can be removed without affecting user work; if retained temporarily, remove their imports from active routes and components and record the limitation. Do not delete reference images or unrelated assets.
- Update `AGENTS.md` only where an exact lasting token/component decision is not already recorded.

## Build steps
1. Mark this plan approved after user approval.
2. Add and validate the static font files and license; implement font loading and the light-only root shell.
3. Define the complete token set in `src/global.css` and JS motion constants in `src/theme/motion.ts`.
4. Implement and type the shared primitives, including accessibility and Reduce Motion behavior.
5. Restructure the current routes into a root stack plus tabs group, then add the design-system gallery.
6. Migrate the active tab shell to the new tokens and remove its dependency on the starter theme.
7. Verify, visually compare the gallery against the reference, correct differences, and document estimates.

## Verification
- `npx expo lint`, `npx tsc --noEmit`, `npx expo install --check`, and `git diff --check` all pass.
- Production iOS and web exports compile, proving font assets, NativeWind classes and routing bundle correctly.
- Open `/design-system` in an iOS simulator, capture a screenshot, and compare typography, palette, spacing, radii, borders, shadows and component states against `design.png`. Repeat after fixes.
- Check the same gallery on web at phone and wide viewport widths.
- Exercise primary/secondary buttons, icon buttons, text-field focus, chip selection, segmented selection, stepper bounds, Switch, and alert dismissal. Confirm labels, roles, disabled state, 44pt targets and visible state changes.
- Enable Reduce Motion and confirm press feedback remains usable without scale motion.
- Confirm `/` still renders the existing HomeScreen and the design gallery is absent from the tab bar.

## Reporting
Use the required Done, Verified, You need to, Test it yourself and Notes sections. Report exact files changed, commands and runtime evidence, font source/license, any values estimated from the image, and any device-only behavior that could not be judged in the simulator.

## Result
Implemented the Bard token theme, five static Plus Jakarta Sans faces, shared text/icon/control primitives, token-backed native tabs, the light root shell, and a reviewable `/design-system` gallery with `?y=<offset>` scrolling. Removed the unused Expo starter theme and components so the app has one styling system.

The final iOS comparison covered the full gallery and corrected the native Switch track to use the accent token. The exact printed palette came from the reference; supporting semantic colors, typography metrics, radii, and shadows remain visual estimates from the image. Font files and `OFL.txt` came from the official `tokotype/PlusJakartaSans` repository. Lint, TypeScript, dependency compatibility, diff whitespace, and production iOS/web exports pass. Browser automation was unavailable in this session, so web was bundle-verified but not visually checked at phone and wide widths.
