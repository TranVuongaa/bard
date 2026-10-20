# 08 · Home and local property search

Status: done

## Goal

Build the signed-in Home experience from `assets/prompt-images/home.png` using
Bard's established brand and design system. A guest can enter a natural-language
stay request on Home, submit it, and land on a Search tab showing ranked results
from realistic typed property data bundled with the app.

## Decisions

- Keep Bard's approved painted wordmark and existing yellow/lavender/ink palette;
  the reference's “roam” wordmark is composition guidance, not a new brand asset.
- Treat “local property data” as a typed in-app fixture. This checkout has no
  Sanity/search implementation yet despite the future-state notes in `AGENTS.md`,
  so this feature will not invent a backend or secret-bearing API route.
- Use six realistic stays across cabin, beach, city, and villa categories. Text,
  prices, ratings, amenities, and search terms live locally; photography uses
  remote placeholder URLs through `expo-image` with cached loading placeholders.
- Match the reference's four native tabs: Home, Search, Trips, and Profile. Search
  is implemented here; Trips and Profile are deliberately simple destinations so
  every visible native-tab trigger has a valid route without expanding into the
  later booking/profile features.
- The Home query is preserved in a `q` URL parameter when navigating to Search.
  Search uses a deterministic local ranker over title, place, type, amenities,
  vibes, and price phrases. It is demo behavior, not a substitute for the planned
  Jev + Sanity search stack described in `AGENTS.md`.
- Category chips filter the Home recommendations immediately. “All stays” resets
  the filter. Search results can be refined by editing and resubmitting the query.
- Home property cards do not open stay details in this increment because no stay
  detail route exists yet. Their visual arrow from the design is omitted rather
  than presenting a dead control.
- Use the current Expo SDK 58 stable import, `expo-router/native-tabs`, which the
  app already uses and current Expo 58 documentation confirms. Do not replace it
  with the skill reference's older `unstable-native-tabs` import.
- Motion gate: tab switching is frequent and remains native/unanimated; press
  feedback is a 120 ms, 0.97 scale for immediate feedback; image loading uses a
  240 ms cross-dissolve; a newly requested Search result set uses one container
  fade/translate entrance. Reduce Motion removes scale/translation while keeping
  state legibility. No animation runs from a scroll handler and no virtualized
  row receives an `entering` animation.
- No dependency is required: Expo Router, Expo Image, Reanimated, Worklets, and
  Gesture Handler are already installed at SDK-compatible versions.
- Existing uncommitted edits in `app.json`, `package.json`, and
  `prompts/07-premium-splash.md` are user-owned and will be preserved. This feature
  does not need to edit those files.

## Design mapping

- Home is a white, edge-to-edge scroll surface under the native tab bar with
  approximately 20 px horizontal padding on a 390–430 pt phone.
- Header: standard Bard wordmark at top left; Clerk profile photo at top right in
  a circular, accent-tinted frame, falling back to the guest's initial.
- Hero: muted “Hey, {first name}” line, large two-line “Find your next stay”
  heading, and a compact rounded search affordance aligned with the title as the
  layout allows at larger accessibility sizes.
- Search composer: lavender rounded surface, search/spark-style icon, editable
  single-line prompt, and circular submit button. Empty submission focuses the
  input and does not navigate.
- Categories: wrapping pill controls for All stays, Cabins, Beach, City, and
  Villas. Selected state uses Bard accent; unselected state uses canvas.
- Recommendations: large 16:11 image cards with rounded corners, bottom gradient
  overlay, location, title, and a surface rating capsule at top right. Cards stack
  vertically with enough bottom inset to remain clear of native tabs.
- Search: matching title/search composer, result count, and the same property-card
  language. Empty matches show a designed clear-query action rather than a blank
  list.
- Proposed tokens, all added only to `src/global.css`: a compact home eyebrow
  typography step, hero/search/card-specific surface colors derived from the
  reference, and any repeated card/search geometry that is not already expressed
  by the existing spacing/radius/shadow scale. No hex, arbitrary class, raw font
  size, or repeated visual literal is added outside the token file.
- Values inferred from the image and subject to simulator comparison: 20 px screen
  edge, 20–24 px section gaps, 52–56 px composer height, 22–28 px composer/card
  radii, and the card aspect ratio. The exact native tab bar material and height
  remain platform-owned.

## Out of scope

- Sanity documents, API routes, Jev intent parsing, semantic embeddings, Clerk
  server verification, analytics, persisted favorites, bookings, and stay-detail
  navigation.
- Full Trips and Profile designs or account editing.
- Downloading or committing stock-photo binaries; remote property photography is
  explicitly allowed by the project design rules.
- Recreating the reference's custom glass tab bar. Expo Native Tabs owns tab-bar
  shape, material, safe-area behavior, and transitions.

## Steps

### 1. Add the local property model and deterministic search

Create `src/data/properties.ts` with a typed `Property` model, category union, and
six realistic fixtures, including stable IDs, titles, locations, nightly prices,
ratings, image URLs, placeholder hashes/colors, amenity labels, and searchable
vibe terms. Create `src/lib/property-search.ts` with pure functions to filter by
category and rank a normalized query, including simple parsing for “under $N” and
positive token matches. Keep the logic deterministic and independently testable;
do not call the network or log guest text.

### 2. Extend Bard's existing design system for the screen

Add only the missing semantic tokens to `src/global.css`. Register any required
SF/Material symbols in `src/components/ui/icons.tsx`. Build reusable home/search
pieces under `src/components/properties/`: a local-search field, category pills,
property card, result list/empty state, and a profile avatar. Use the existing
`Text`, `Icon`, `BrandLogo`, and `PressableScale` primitives, `expo-image` through
a NativeWind `styled` wrapper, accessible labels/roles, 44 pt minimum targets,
dynamic type, cached remote images with placeholders, and no emoji glyphs.

### 3. Build the Home screen from the reference

Replace the temporary signed-in content in `src/app/(tabs)/home.tsx` with the
design-matched Home composition. Read the Clerk guest name/photo, keep the search
draft locally, submit with `router.navigate({ pathname: '/search', params: { q }
})`, filter recommendations through the category pills, and render the property
fixtures in a first-child `ScrollView`/list compatible with Native Tabs' automatic
insets. Do not keep the current sign-out/debug controls on Home; sign-out belongs
to Profile.

### 4. Add Search and supporting native-tab destinations

Create `src/app/(tabs)/search.tsx`, `trips.tsx`, and `profile.tsx`. Search reads the
focused route's `q` with `useLocalSearchParams`, initializes/synchronizes its
editable query, ranks local fixtures, supports resubmission, and exposes content
and no-result states. Profile shows the Clerk identity and retains a reliable
sign-out action with the existing error translation. Trips uses a purposeful
coming-soon empty state. Extend `src/components/app-tabs.tsx` and
`src/components/app-tabs.web.tsx` with the same four static routes and appropriate
native symbols; set Search's semantic native-tab role only if SDK 58's ordering
and appearance remain consistent with the approved four-tab reference.

### 5. Add only purposeful, accessible motion

Use the existing `PressableScale` for buttons, chips, avatar, and card-like
controls. Configure `expo-image` cross-dissolves at `motion.base`. Animate the
non-virtualized Search result container once when a submitted query changes using
module-scope or memoized Reanimated builders and `ReduceMotion.System`; do not
stagger recycled rows. Keep native tab switches unmodified. Confirm all effects
use transform/opacity on the UI runtime and that reduced-motion users receive an
immediate/fade-only equivalent.

### 6. Compare, refine, document, and close out

Run the app in the iOS simulator, sign in, deep-link to `bard://home`, capture a
screenshot, and compare it against the supplied 941 × 1672 reference. List every
visible mismatch, adjust tokens/components, and repeat until hierarchy, spacing,
type, radii, colors, icons, image cropping, safe areas, and native-tab clearance
are acceptably aligned. Also capture Search with a realistic prompt. Update
`AGENTS.md` with the lasting local-demo search and Home composition decisions,
keeping it under 150 lines; then add `## Result` here and set `Status: done` only
after verification passes.

## Verification

- Run `npx expo lint`, `npx tsc --noEmit`, and `git diff --check`.
- Run `npx expo-doctor` and distinguish new issues from the user's existing dirty
  dependency/config work.
- Confirm the four native tabs render and switch without custom slide animation on
  iOS; confirm the web tab fallback exposes the same destinations.
- On Home, verify the real Clerk first name/photo and fallback states, editable
  query, keyboard submit button, empty-submit behavior, all five category filters,
  card text, image placeholders, and scrolling above the native tab bar.
- Search realistic inputs such as “quiet pet friendly cabin with a hot tub under
  $300 a night”, “beach house”, “city stay”, and a no-match phrase. Record the
  ranked result order and explain any unexpected match using the pure ranker's
  terms/price rule.
- Verify editing and resubmitting on Search updates results and URL state without
  duplicate navigation; verify the empty result state can clear the query.
- Verify Trips' empty state and Profile's Clerk identity/sign-out behavior.
- Turn on Reduce Motion and verify presses no longer scale, Search drops its
  translation, image/content changes remain understandable, and tabs do not slide.
- Capture Home and Search screenshots in the iOS simulator and compare with the
  attached design. Record every value estimated from the image and any unavoidable
  difference caused by the native tab bar, Bard wordmark, Clerk avatar, or remote
  photography.
- Feel-check on a release build or physical device if available: repeated taps,
  fast scrolling, keyboard submission, interrupted image loads, and Search result
  changes must remain smooth. Do not claim real-device smoothness from Expo Go or
  the simulator alone.

## AGENTS.md updates

- In **Content**, record that this interim checkout uses typed local property
  fixtures and deterministic local search until the documented Sanity/Jev stack is
  implemented; remove that sentence when the real content/search layer lands.
- In **Design system**, record the Home/Search visual structure, the four static
  native tabs, and the purposeful motion rules introduced here. Replace any
  contradictory placeholder-home sentence rather than appending another rule.

## Result

- Replaced the temporary signed-in screen with the design-matched Bard Home,
  typed local stay fixtures, category filters, cached image cards, and a sentence
  search that navigates into ranked Search results.
- Added the four static Expo Native Tabs shown in the reference. Search is fully
  functional; Trips and Profile are intentionally interim, with Clerk identity
  and sign-out retained on Profile.
- Motion passed the animation gate: tab switches remain native, press feedback is
  the shared 120 ms treatment, images cross-dissolve over `motion.base`, and only
  newly requested Search result containers enter with Reduce Motion support.
- Verified lint, TypeScript, whitespace, deterministic search cases, an iOS Metro
  production export, and Home/Search/empty/Trips/Profile rendering in the iPhone
  17 Pro simulator. Final captures are `/tmp/bard-home-final-2.png`,
  `/tmp/bard-search-1.png`, `/tmp/bard-search-empty.png`, `/tmp/bard-trips.png`,
  and `/tmp/bard-profile-final.png`.
- The simulator comparison drove tighter section spacing and control heights and
  removed an unrequested recommendation heading. Values estimated from the image
  were the 20 px edge, 40 px hero type, 56 px search composer, 44 px category
  pills, 20 px card radius, and 16:11 card ratio.
- `expo-doctor` passed 19/20 checks; the only failure is the machine-level missing
  CocoaPods executable. Runtime Reduce Motion and physical-device/release-build
  feel checks remain manual because Simulator CLI and Expo Go cannot validate
  them reliably.
