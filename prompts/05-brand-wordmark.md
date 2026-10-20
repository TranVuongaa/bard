# Painted Bard wordmark

Status: done

## Goal
Replace the temporary text logo with a reusable image identity: bold lowercase brush calligraphy with a restrained yellow painted underline.

## Current checkout
- Expo ~58.0.16; Expo Image is already installed.
- Logos appear in onboarding, the shared authentication form, and the design-system gallery.
- Onboarding currently places the text logo on a yellow rounded rectangle.
- `prompts/TEMPLATE.md` is absent; this plan follows the existing plan structure.

## Design and defaults
- Current draft: `assets/images/brand/bard-wordmark-draft-v2.png`, 1774 × 887, with an alpha channel. Original draft retained for comparison.
- User refinement: “a little crazy” — expressive looping brush letters, a sweeping final stroke, and a lively yellow underline; retain small-size legibility.
- Near-black lettering and yellow underline follow ink/accent palette intent. Painted raster colors may vary slightly from the exact tokens.
- Preserve the entire image aspect ratio and calligraphic strokes, without stretching or clipping.
- Replace the yellow onboarding rectangle with the image. Check contrast against each slide; use an existing surface/glass token behind the mark only if needed for readability.
- Shared `BrandLogo` component outside routes uses Expo Image with contain sizing and accessibility label “Bard”. Expose named sizes and layout overrides; keep sizing in design tokens.
- Proposed width tokens: compact 112px, standard 144px, large 192px, each with a 2:1 image ratio. Refine visually after approval.
- Use the same asset in onboarding, sign-up/sign-in, and the design-system brand preview. Keep ordinary prose mentioning Bard as text.
- No dependency or service additions. App launcher icon and splash assets require a separate composition and are outside this wordmark replacement.

## Build steps
1. On approval, set Status to approved and retain the approved PNG under `assets/images/brand/`.
2. Read SDK 58 Expo Image documentation and the existing design-system skill before implementation.
3. Add logo size tokens and a shared BrandLogo component; replace all three logo usages.
4. Inspect onboarding on all three photos, authentication, and the gallery in the iOS simulator. Capture screenshots and correct clipping, contrast, or spacing.
5. Run verification, record results, update AGENTS.md with the shared brand asset convention, and set Status to done.

## Verification
- `npx expo lint`, `npx tsc --noEmit`, `git diff --check`.
- Confirm PNG alpha, accurate “bard” lettering, and legibility at actual header size.
- Simulator screenshots of onboarding, sign-up/sign-in, and design-system preview.
- Confirm accessibility label, preserved aspect ratio, no layout overlap, and no remote dependency for the logo.

## Reporting
Follow AGENTS.md reporting requirements with changed files, check evidence, screenshots, and any limitations. This draft stage changes no app code.

## Asset provenance and generation prompt
Revision 2 was generated with the built-in imagegen tool using the first draft as reference, and saved to `assets/images/brand/bard-wordmark-draft-v2.png`.

Revision prompt:
Revise this bard logo to be a little crazier and more expressive while remaining an excellent legible reusable app wordmark. Preserve exact lowercase text 'bard', near-black ink #0B0B1A and warm yellow #FFC629, genuine transparent background. Add playful hand-painted brush calligraphy character: a more energetic slant, slightly irregular bouncing baseline, an exuberant looping b entry stroke and a cheeky flick on the final d. Thick confident ink strokes with restrained dry-brush texture. Replace the tidy underline with a quick lively yellow brush swoosh with a small unexpected upward flick. Controlled artistic mischief, not chaotic graffiti: all four letters must be immediately readable at small sizes. Keep a compact horizontal silhouette, no detached decorative icons or extra text, no background rectangle, no mockup, no shadow, no clipped strokes. One polished logo asset.

Generated with the built-in imagegen tool. Original retained under `/Users/hjstory/.codex/generated_images/01a15803-bf8b-7940-9a4b-fee22cec5d8d/call_5dd88b2eb55a42658da9802df90b9bc3.png`.

Prompt:
Create a professional reusable brand wordmark image for a boutique travel and stays app named bard. Exact text: "bard" in lowercase, only this word. Hand-painted modern brush calligraphy, bold confident substantial ink strokes with subtly visible dry-brush edges, elegant flowing connected forms, friendly artistic character, very legible at small app-header sizes. Color: near-black ink #0B0B1A. A restrained warm golden yellow #FFC629 painted swoosh under the baseline adds a little expressive style, without becoming a rectangular background or obscuring letters. Compact horizontal composition, all four letters clearly readable, generous but modest transparent padding around all strokes, no clipping. Genuine transparent background. No mockup, no paper, no scene, no other text, no symbols, no frame, no gradients, no shadow. Premium hand-lettered identity, not a typeset font. One final logo centered on the canvas.

## Result
- User approved revision 2 and the implementation plan. Final asset: `assets/images/brand/bard-wordmark.png`; both drafts retained.
- Added shared BrandLogo, exported through the UI barrel, and named size/aspect tokens. Onboarding, the shared sign-up/sign-in form, and gallery now use it.
- Simulator inspection confirmed readable lettering, complete strokes, correct aspect ratio, and transparent rendering. Added existing glass background on onboarding after the woodland photo competed with the ink.
- Screenshots: `/tmp/bard-logo-final-1.png`, `/tmp/bard-logo-final-2.png`, `/tmp/bard-logo-final-3.png`, `/tmp/bard-logo-sign-up.png`, `/tmp/bard-logo-sign-in.png`, `/tmp/bard-logo-gallery.png`. Slides 2 and 3 were inspected with temporary initial-state changes, restored afterward.
- Lint, TypeScript and whitespace checks pass. PNG alpha verified with sips. Accessibility label and local bundled source checked in code; VoiceOver and Android/web visual testing were not run.
- Sizes are design choices, not estimates from a screenshot. No dependency added. App icon/splash remain outside scope.
