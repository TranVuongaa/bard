# Onboarding and authentication entry screens

Status: approved

## Goal
Match `assets/prompt-images/onboarding.png` closely, using Unsplash photos, and connect three onboarding slides to sign-up and sign-in UI. The user selected UI only: Clerk integration is deferred. No dependencies or services are added.

## Current checkout
- Expo ~58.0.16, Expo Router ~58.0.24, NativeWind v5, existing Expo Image and Reanimated.
- `src/app/_layout.tsx` loads Plus Jakarta Sans and renders the root stack.
- `src/app/(tabs)/index.tsx` is a starter Home screen; no auth routes or Clerk integration exist.
- Shared Text, Button, TextField, Icon and PressableScale primitives exist. Tokens live in `src/global.css`.
- AGENTS.md describes future authentication behavior that is not implemented in this checkout. Preserve Clerk as the intended provider, documenting this task's UI-only status.
- `prompts/TEMPLATE.md` is absent; this plan follows the project's required goal, design, steps, verification and reporting structure.

## Confirmed scope and defaults
- Three slides, with the first matching the supplied reference; subsequent slides reuse its composition with new photo and copy.
- Use Bard instead of the reference's roam branding. No Bard wordmark asset exists, so use a clearly documented temporary text wordmark in the bundled ExtraBold font.
- Use Unsplash landscape/property photos with stable URLs and record their sources. Choose a mountain cabin image closest to the reference for slide one. Location captions must match known photo metadata; otherwise use a descriptive caption instead of inventing a place.
- Onboarding is the initial route. Preserve the starter tabs at `/home` and the existing `/design-system` route.
- No persistence of onboarding completion until auth is connected.
- Authentication screens are functional navigation/UI previews, not working authentication: inputs validate locally, then display “Account creation is coming soon” or “Sign-in is coming soon”; never claim a session was created or navigate into a signed-in state.
- Google remains visible as in the design. It opens sign-up with a visible message that Google sign-in is coming soon. Use an official Google asset; if unavailable, clearly mark the missing asset rather than recreating it.

## Design specification
Recreate the app content inside the phone, excluding the mock device frame, background and simulated status bar.

- Full-bleed scenic photograph behind the top safe area and hero, cropped with `contentFit="cover"`. Hero occupies approximately the top 60% of the reference screen.
- Top row: large lowercase Bard text at left and a pale translucent pill labelled “Skip” at right; approximately 24pt horizontal inset. Native status bar remains visible.
- Dark translucent, thin-bordered location pill sits just above the white panel, left aligned with the content. White location icon and 12–14pt label.
- Bottom white panel has an asymmetric curved upper edge, approximately 48pt left and 64pt right curvature, with a slight slope matching the reference. Build using native views and token-backed geometry; no new SVG dependency.
- Three short rounded progress bars sit above the heading: lavender active, pale neutral inactive, about 32 × 4pt with 8pt gaps. Accessible slide controls have at least 44pt touch targets.
- Heading is heavy black, approximately 36pt with a tight 1.05 line height; slide one reads “Find a stay that fits your story” on two lines at reference width.
- Body is muted, approximately 16pt with 1.3 line height: “From mountain cabins to oceanfront villas, Bard helps you find unforgettable stays for every kind of trip.”
- Full-width yellow pill CTA, approximately 52pt tall, centered “Get started” and a right-aligned arrow. Below it is a white outlined Google pill, approximately 52pt tall, with official Google mark and “Continue with Google”.
- Bottom safe-area padding and approximately 24–28pt horizontal content insets; use flexible hero height and scrolling for short screens or enlarged type.
- Slide two: “Your kind of getaway”; “Describe your dream stay, from a quiet cabin to a sunny coastal escape.” Beach/coastal photo.
- Slide three: “Feel at home, anywhere”; “Find a place for your next chapter, whether you’re travelling solo or bringing everyone along.” Welcoming house photo.
- Slide one button “Get started” advances to slide two; slide two “Next” advances to slide three; slide three “Create an account” opens sign-up. Skip opens sign-up from every slide. Progress controls allow revisiting slides.
- Sign-up and sign-in use the same palette, wordmark, pill buttons and labelled TextFields on a white background, with keyboard-safe scrolling and a back control. Sign-up: name, email, password, Create account and Sign in link. Sign-in: email, password, Sign in and Sign up link. Errors are inline and passwords hidden.

## Tokens and assets
- Reuse surface, ink, muted, accent, lavender, border, glass and scrim; retain the app's established palette instead of changing global colors from screenshot estimates.
- Reuse 4pt spacing scale, full radius, and existing body/button/caption fonts.
- Proposed additions in `src/global.css`: onboarding heading 36px/1.05, onboarding body 16px/1.3, wordmark 48px/1, panel radii 48px and 64px, plus named panel geometry utilities if needed. Text variants expose these styles.
- Dimensions and curvature are estimates from the screenshot; refine after simulator comparison.
- Photo loading/failure retains a neutral background and usable text/navigation. A failed decorative photo must not block progression.
- Reuse existing press feedback and Reduce Motion handling. No automatic carousel advance or decorative motion.

## Files and build steps
1. After approval, set Status to approved.
2. Select and inspect Unsplash photos and obtain the official Google mark. Record sources and any asset limitations.
3. Extend `src/global.css` and `src/components/ui/text.tsx` with required tokens/variants only.
4. Add onboarding composition/data outside routes, under `src/components/onboarding/`, and the thin `/onboarding` route.
5. Move the starter tab index to `src/app/(tabs)/home.tsx`, update explicit tab configuration as needed, and add root `index.tsx` redirecting to onboarding. Register onboarding and auth group in the root layout.
6. Add `(auth)/_layout.tsx`, `sign-up.tsx`, `sign-in.tsx` and shared auth layout/form components under `src/components/auth/`. Implement local validation, navigation and honest unavailable-auth feedback.
7. Open the app in the iOS simulator, compare against the reference, fix visual differences, and exercise the complete navigation path.
8. Run verification; update AGENTS.md with lasting onboarding/UI-only decisions without rewriting unrelated project memory. Add Result here and set Status to done.

## Verification
- `npx expo lint`, `npx tsc --noEmit`, `git diff --check`.
- Production iOS and web exports compile.
- Fresh launch opens slide one without tabs. Check all three slides, progress controls, Skip, final CTA, Google entry, sign-up/sign-in links, and back navigation.
- Confirm invalid inputs show clear local validation and valid inputs never fabricate authentication.
- Capture iOS screenshots with `xcrun simctl io booted screenshot <path>`; deep link using `exp://127.0.0.1:8081/--/onboarding` in Expo Go or `bard://onboarding` in a development build. Compare composition, image crop, text wrapping, colors, curve, spacing and buttons to the reference; fix and repeat.
- Check a short phone and larger text for clipping, keyboard overlap and reachable controls.
- Confirm image failures do not block actions and `/design-system` and `/home` still resolve.

## Reporting
Use AGENTS.md's Done, Verified, You need to, Test it yourself and Notes sections. List files, commands and screenshot evidence, photo/Google sources, estimated dimensions and missing assets. Clearly state that Clerk and real Google/email authentication are deferred by the user's selection. Mark unrun checks as unverified with the reason.
