# Clerk authentication

Status: implemented — manual device verification pending

## Goal

Connect Bard's existing custom authentication UI to the selected Clerk application
`app_3Kwr0h3ewwcSJ6KeuhKl0Q461u2`, with persistent sessions and protected app routes.

## Current state

This checkout uses Expo SDK 58, React Native 0.88, and Expo Router 58.
There is no Clerk dependency, provider, session handling, or other auth provider.
`src/components/auth/auth-form.tsx` validates inputs but displays coming-soon notices.
The root layout exposes every route and `index.tsx` always redirects to onboarding.
Home is a placeholder in `(tabs)`. AGENTS.md describes a later implementation that
is not present here; preserve its auth decisions without assuming those files exist.
`prompts/TEMPLATE.md` is absent, so this plan supplies its own structure.

## Decisions

- Retain the separate custom sign-up and sign-in screens, brand assets, and tokens.
- Email/password sign-up includes email-code verification. Sign-in handles
  new-device email verification. Password minimum remains eight characters.
- Use current method-based `@clerk/expo` hooks, not legacy hooks.
- Use browser SSO through `useSSO` for Google and Apple.
- Keep the existing `(tabs)` route group; protect it with `Stack.Protected`.
- Add a minimal signed-in identity and sign-out action to the placeholder Home.
- Do not add organizations, production deployment, or unrelated feature screens.
- Never read existing environment files or print keys. Never create a new Clerk
  application. No existing users will be created, changed, or deleted without permission.

## Prerequisites and setup

1. User runs `npx -y clerk@latest auth login` in their host terminal.
2. Confirm selected application's Native API and email/password, email verification,
   Google, and Apple settings using CLI read-only inspection. Report disabled factors;
   get approval for any necessary Dashboard configuration changes.
3. Clerk agent skills have already been installed globally.
4. Check current CLI behavior before initialization. Use the selected application
   explicitly. Honor the project's requirement to install packages through
   `npx expo install`: install `@clerk/expo`, `expo-secure-store`,
   `expo-auth-session`, and `expo-crypto` as required by the current SDK.
   `expo-web-browser` is already present. If installing first makes this an existing
   Clerk project, use `link --app` and `env pull` rather than `init`; never run a
   bootstrap that overwrites the custom screens or working configuration.
5. Keep local keys gitignored and put only variable names in `.env.example`.
   Check SDK 58 compatibility and installed Clerk type definitions before coding.

## Implementation

1. Root layout: add ClerkProvider and tokenCache; wait for fonts and Clerk before
   hiding the splash. Protect signed-in tabs and signed-out onboarding/auth.
   Index redirects based on loaded session state; retain the design-system route.
2. Auth form: replace placeholder submits with method-based password flows,
   finalize completed sessions, and route incomplete verification to `/verify`.
   Prevent duplicate submission; show loading and actionable errors without logging
   user input. Add the CAPTCHA mount point.
3. Verification: add an auth route and reusable component for code entry, resend,
   loading, invalid/expired-code errors, and missing-flow recovery.
4. Social auth: wire existing Google entry points and add an Apple browser SSO
   action using registered icon assets/library symbols. Handle cancellation,
   incomplete flows, failures, and session activation.
5. Home: show signed-in identity and sign-out. Route guards handle navigation after
   authentication and sign-out.
6. Centralize safe auth error copy and validation in `src/lib/auth/`.
   Update only relevant lasting auth decisions in AGENTS.md on completion.

## UI and assets

Preserve existing auth layout: white surface, standard BrandLogo, heading/caption
text variants, labelled fields, rounded primary action, Google image asset, and
24px horizontal spacing. Verification reuses these primitives with a numeric code
field, Verify button, resend action, and back navigation. Error messages use
existing danger tokens; loading uses existing button feedback.
Use current tokens for spacing, typography, radii, and colors; no new tokens planned.
No new design image was supplied; review against existing screens, not an invented
pixel-perfect reference.

## Verification

- `npx expo lint`
- `npx tsc --noEmit`
- `npx -y clerk@latest doctor`
- Start the app and open it in the iOS simulator; capture screenshots of sign-in,
  sign-up, and verification and check visual regressions.
- Check signed-out deep links cannot access Home.
- With user authorization for a test account, check sign-up, invalid verification,
  resend, sign-in, new-device trust, sign-out, and session persistence after restart.
- Check enabled SSO flows; report any unavailable credentials or Dashboard settings.
- Confirm no secret keys or user-input logging were introduced into tracked code.

## Reporting

Report Done, Verified, You need to, Test it yourself, and Notes as applicable.
Distinguish executed checks from blocked/manual checks. Add a Result section and
set Status to done only after implementation and required verification.

## References

- https://clerk.com/docs/cli
- https://clerk.com/docs/expo/getting-started/quickstart
- https://clerk.com/docs/guides/development/custom-flows/authentication/email-password?sdk=expo
- https://docs.expo.dev/versions/v58.0.0/
- Local skills: expo-router, clerk-expo, clerk-cli.

## Result

Implemented custom email/password auth, verification and resend, new-device email
verification, Google/Apple browser SSO, secure token caching, protected tabs, and
Home identity/sign-out. Installed Clerk 4.13.0 and Expo SDK 58-compatible peers.
The existing CLI link and locally provisioned keys were preserved; no environment
files were read or printed. The user approved changing development's password
minimum from 15 to eight; the CLI dry-run and applied result confirmed that change.
Native API, email verification, first/last names, Google and Apple are enabled.

Verification completed:

- `npx tsc --noEmit` and `npx expo lint`: exit 0.
- `npx -y clerk@latest doctor --json`: exit 0; only optional production-instance
  and shell-completion warnings.
- `git diff --check`: pass. Source scan found no secret-key references, auth-input
  logging, or legacy Clerk hook imports.
- Running Expo app inspected in the booted iPhone 17 Pro simulator. Sign-up and
  sign-in render with existing typography/assets; `/verify` without an attempt
  shows recovery; signed-out `/home` redirects to onboarding.
- Screenshots: `/tmp/bard-clerk-qa/sign-up.png`, `sign-in.png`,
  `verify-recovery.png`, and `home-guard.png`. No new design image was provided;
  existing screen styles were reused, with no estimated design measurements.
- Authorized test account: `bard-qa-1792480119+clerk_test@example.com`.
  Frontend API smoke test passed sign-up, send code, invalid-code rejection (422),
  resend, verification, sign-out, invalid-password rejection (422), sign-in,
  `needs_client_trust`, device-trust verification, and final sign-out.
  The account remains; both test sessions were signed out. No user data was deleted.
  A first script attempt received a non-JSON response; using an explicit test
  User-Agent resolved it.

Remaining manual checks: active verification form interaction, full SDK-based
on-device sign-in/sign-out, persistence after restart, and Google/Apple round
trips. The available toolset cannot tap/type in the simulator (Computer Use's
required node_repl tool is unavailable); API tests do not establish these results.
No native development build was produced. The app remains running in Expo Go.

Manual reproduction:

1. Run `npx expo start` (or use the existing server on port 8081) and open iOS.
2. Create an account with a fresh `name+clerk_test@example.com` address and a
   non-compromised password of eight or more characters.
3. Enter an incorrect code, resend, then enter `424242`.
4. Confirm Home displays the account, restart the app, then sign out.
5. Sign in again; if asked for a device-trust code, use `424242`.
6. Exercise Google and Apple with accounts you control.
   Expected: successful auth opens Home, restart retains the session, sign-out
   returns to onboarding, and failures show actionable messages.
