# NativeWind v5 setup

Status: done

## Goal
Enable NativeWind v5 className styling in the existing Expo SDK 58 app using https://www.nativewind.dev/v5/llms-full.txt and its installation guide. Keep the installed Expo/React Native versions.

## Current state
- Expo ~58.0.15, React Native 0.88.0, React 19.3.0; npm package-lock.json.
- NativeWind, Tailwind, Metro and PostCSS configuration are absent.
- src/global.css contains starter font variables and is imported from src/constants/theme.ts.
- src/app/index.tsx is a user-edited centered HomeScreen placeholder; preserve its content and layout. explore.tsx is already deleted by the user.
- AGENTS.md is user-modified and describes a more developed app than the current checkout. Limit this task to styling setup.
- prompts/TEMPLATE.md is absent; this self-contained plan supplies the required sections.
- NativeWind's documented RC target is SDK 57, so SDK 58 compatibility needs verification.

## Scope and defaults
- Install nativewind 5.0.0-rc.0 and react-native-css 3.1.0-rc.0 together, pinned exactly.
- Install Tailwind and its PostCSS plugin at 4.1.12, lightningcss at 1.30.1, and PostCSS pinned to the resolved version. Use npx expo install for all packages. Keep the existing SDK-compatible native peers.
- Set the lightningcss override to 1.30.1.
- Add metro.config.js with Expo's default configuration wrapped in withNativewind; add postcss.config.mjs with @tailwindcss/postcss. No Babel configuration is needed.
- Add the documented CSS imports, leaving utilities unlayered. Preserve starter font variables, clear default color/text/radius/shadow token families per AGENTS.md, and define the existing 4px spacing contract. No new visual palette or font assets are introduced.
- Move the sole global CSS import to src/app/_layout.tsx from src/constants/theme.ts.
- Add nativewind-env.d.ts referencing react-native-css/types; add a separate CSS module declaration only if TypeScript needs it.
- Convert only the HomeScreen container's existing inline flex/centering to equivalent className utilities as a smoke check; remove its unused StyleSheet declaration/import. Keep the screen copy.
- Keep current navigation and appearance configuration; the broader starter-app differences from AGENTS.md are outside this setup.
- If lint tooling is absent, install Expo-compatible eslint and eslint-config-expo via npx expo install and create the standard flat configuration as part of verification setup.

## Build steps
1. Mark this plan approved after user approval; inspect package peer requirements and install pinned dependencies.
2. Configure Metro, PostCSS, CSS imports and type declarations.
3. Apply the HomeScreen layout smoke check without overwriting other user edits.
4. Run verification; explain any SDK incompatibility before changing the approach.
5. Record results, set Status: done only after required checks pass, and update only relevant lasting decisions in AGENTS.md if necessary.

## Verification
- npx expo install --check: installed native dependencies match SDK 58.
- npx expo lint and npx tsc --noEmit: both must pass.
- Export iOS and web bundles to a temporary directory to exercise Metro and CSS compilation.
- Open the app in an available iOS simulator and capture a screenshot confirming HomeScreen stays centered with className. Report unavailable runtime verification explicitly.
- Review git diff to ensure existing user changes remain intact and pinned versions/override agree.

## Reporting
Use AGENTS.md's Done, Verified, You need to, Test it yourself and Notes sections as applicable. Include commands and actual results, runtime evidence or limitations, and the SDK 58 compatibility outcome.

## Result
NativeWind 5.0.0-rc.0 is configured with its matching react-native-css engine and the documented Tailwind/PostCSS/Metro setup. Expo SDK 58 compiled production iOS and web exports successfully, and the iOS simulator rendered the HomeScreen centered through NativeWind className utilities. Lint, TypeScript, Expo dependency compatibility and diff checks pass.
