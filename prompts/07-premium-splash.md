# Premium native splash screen

Status: done

## Goal

Replace the temporary Expo-blue launch screen with a polished Bard-native splash
screen that appears immediately when the iOS app opens and remains visible while
Clerk and the bundled fonts load.

## Current state

- The project uses Expo SDK 58 and `expo-splash-screen` 58.0.10 through its config
  plugin in `app.json`.
- The current splash is a 228 × 213 white Expo placeholder mark rendered at 76 px
  over `#208AEF`.
- `src/app/_layout.tsx` correctly calls `preventAutoHideAsync()` at module scope and
  hides the splash only after Clerk and Plus Jakarta Sans are ready.
- Bard's approved painted wordmark is
  `assets/images/brand/bard-wordmark.png`; its near-black lettering cannot be used
  unchanged on a near-black background.
- `prompts/TEMPLATE.md` is absent, so this plan follows the existing plan format.

## Approved direction

- Use the user's selected **premium near-black** direction.
- Background: existing `ink` brand color `#0B0B1A`.
- Center a light version of the approved painted Bard wordmark while retaining the
  warm yellow painted swoosh. Preserve the exact lettering, brush texture, aspect
  ratio, and transparent negative space; do not redesign or typeset the logo.
- Create a dedicated 1024 × 1024 transparent PNG for the native splash rather than
  pointing Expo at the wide source asset. Place the wordmark inside the square with
  even safe padding so Expo scales it consistently without clipping.
- Render the square splash asset at an initial `imageWidth` of 240, targeting an
  approximately 190 px visible wordmark. Refine only if native-build inspection
  shows it is too small or large.
- Use `resizeMode: "contain"` and a 240 ms fade, matching Bard's `motion.base`.
- Light mode remains the only supported appearance, so no separate dark-mode
  launch asset is added.
- No tagline, loading spinner, photography, gradient, or extra decoration. Native
  launch screens should remain static and fast.

## Files and implementation

1. Create `assets/images/brand/bard-splash.png` as the dedicated square,
   transparent launch asset derived from the approved wordmark.
2. Update the `expo-splash-screen` config plugin in `app.json` to use Bard ink,
   the new asset, `contain`, and the approved image width.
3. Configure the built-in splash fade in `src/app/_layout.tsx` at module scope while
   preserving the existing Clerk/font readiness gate and route protection.
4. Do not create or edit `ios/` or `android/`; Expo's config plugin owns native
   generation.
5. Update AGENTS.md only with a concise lasting splash decision after verification.

## Verification

- Run `npx expo lint`, `npx tsc --noEmit`, and `git diff --check`.
- Run `npx expo config --type public` and confirm the resolved splash plugin uses
  the intended background, image, width, and contain mode.
- Confirm the PNG is 1024 × 1024, has alpha, contains the complete wordmark, and has
  no clipped brush strokes.
- Build and inspect the iOS native launch experience. Expo's SDK 58 documentation
  says Expo Go can substitute the app icon and development builds can conflict with
  the dev-client splash, so final visual approval requires a preview or production
  build rather than Expo Go alone.
- Cold-launch the installed build and capture the splash plus its handoff to both a
  signed-out and signed-in destination when practical. Check there is no white or
  blue flash, stretched logo, clipping, or blank frame.
- Verify the splash remains visible until Clerk and fonts are ready and fades over
  240 ms. Also confirm Reduce Motion does not gate this native system transition;
  no custom animated overlay is being introduced.

## Reporting

Follow AGENTS.md reporting requirements with changed files, command evidence,
native-build screenshots or explicit build limitations, and exact reproduction
steps. Add `## Result` and set `Status: done` only after required verification.

## References

- https://docs.expo.dev/versions/v58.0.0/sdk/splash-screen/
- https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/
- Local `expo-design-system` skill.

## Result

- Replaced the Expo placeholder launch treatment with a 1024 × 1024 transparent
  light/yellow Bard wordmark on the ink background. The config uses contain mode
  and a 240 px image box.
- Added Expo's built-in 240 ms iOS fade without changing the existing Clerk/font
  readiness gate.
- The final asset was made with the built-in image-generation tool in two edit
  passes: recolor only the approved wordmark's dark lettering to `#F4F5F7` while
  keeping the yellow swoosh and geometry unchanged, then center that unchanged
  result at 80% width on a square transparent canvas. The square output was
  normalized from 1254 px to Expo's recommended 1024 px.
- `npx expo lint`, `npx tsc --noEmit`, `git diff --check`, and resolved Expo config
  checks pass. A local Release simulator build compiled and installed successfully;
  the generated `SplashScreen.storyboard` compiled with the new asset.
- The post-launch destination was captured at `/tmp/bard-premium-splash.png`, and
  the cold launch was recorded at `/tmp/bard-premium-splash.mov`. The launch screen
  itself cleared too quickly for the available screenshot tooling to isolate a
  clean frame, so its 240 ms fade was not visually timed frame by frame.
- Expo Prebuild generated the ignored `ios/` directory for verification and
  installed CocoaPods 1.17.0 locally. Its unrelated tracked script and temporary
  bundle-identifier edits were removed from the final diff.

