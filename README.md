<div align="center">

# Bard

### A better stay starts with a sentence.

A rental app for finding places that feel right.<br />
Built with Expo, React Native, and a little sunshine.

**Describe a stay · Find your fit · Know before you go**

[The idea](#the-idea) · [Design language](#design-language) · [Run locally](#run-locally) · [Inside the project](#inside-the-project)

</div>

---

## The idea

> “A quiet, pet-friendly cabin with a hot tub under $300 a night.”

That's the starting point for Bard: describe the trip you have in mind, then discover stays that match both the practical details and the feeling you're after.

The product is designed around three moments:

| Moment | The Bard experience |
| :--- | :--- |
| **Describe** | Write naturally. Bring your budget, must-haves, and idea of a perfect escape. |
| **Discover** | Get ranked stays that respect firm requirements and reflect softer preferences like quiet, cozy, or secluded. |
| **Ask** | Ask about a stay's rules or policies and see the relevant source text, word for word. |

### Where things stand

**This checkout is the UI foundation.** It includes the app shell, shared design tokens, reusable components, and an interactive design-system gallery. The home screen opens that gallery.

The rental search, authentication, content integrations, and stay-question experience described in [AGENTS.md](AGENTS.md) are the broader product direction; they are not implemented in this checkout. Booking and payments are not available here.

## Design language

Warm yellow. Soft lavender. Clear typography. Generous space.

Bard's light theme pairs **Plus Jakarta Sans** with rounded surfaces and a consistent 4px spacing unit. The visual language lives in shared tokens so each screen can feel like part of the same place.

| Color | Value | Role |
| :--- | :--- | :--- |
| Sunshine | `#FFC629` | Primary actions and accents |
| Lavender | `#C9B4FE` | Supporting color |
| Ink | `#0B0B1A` | Primary text |
| Muted | `#6B7280` | Secondary text |
| Surface | `#FFFFFF` | Cards and surfaces |
| Canvas | `#F4F5F7` | Screen backgrounds |
| Border | `#E5E7EB` | Subtle separation |

The component library includes buttons, icon buttons, text fields, chips, badges, alerts, steppers, and segmented controls, alongside shared text and icon primitives.

Explore them in the app through **Open design system**, or browse the [gallery source](src/components/design-system/design-system-gallery.tsx).

## Built with

| Layer | Technology in this checkout |
| :--- | :--- |
| App | Expo SDK 58 · React Native 0.88 · React 19.3 |
| Navigation | Expo Router with file-based routes |
| Styling | NativeWind v5 RC · Tailwind CSS v4 |
| Motion | React Native Reanimated · shared motion tokens |
| Typography & icons | Plus Jakarta Sans · Expo Symbols |
| Language | TypeScript |

### Product architecture

The intended service boundaries are documented in [AGENTS.md](AGENTS.md): **Clerk** owns authentication, **Sanity** owns content, **Jev** makes typed decisions, and **PostHog** handles analytics.

The search design keeps exact constraints separate from preference ranking. Code parses numbers and builds filters; semantic similarity helps rank the remaining stays. Policy answers use source text, with checked Knowledge Base passages and source labels. Jev chooses relevant information; it does not write the answer or generate queries.

These integrations are not dependencies of the current UI preview.

## Run locally

You'll need Node.js and npm. To use the iOS simulator, you'll also need macOS and Xcode.

```bash
# Install the project's dependencies
npx expo install

# Start the development server
npx expo start
```

Press **i** to open the iOS simulator, **a** for an Android emulator, or **w** for web. Native appearance can differ across platforms.

On the home screen, tap **Open design system** to explore the components. The gallery route is `/design-system`.

The current UI preview does not require service credentials.

### Everyday commands

| Command | Purpose |
| :--- | :--- |
| `npx expo start` | Start the development server |
| `npx expo lint` | Run ESLint |
| `npx tsc --noEmit` | Check TypeScript types |
| `npx expo-doctor` | Diagnose project and dependency issues |
| `npx expo install <package>` | Add a package using Expo's version resolution |

## Inside the project

```text
assets/
├── fonts/                   Plus Jakarta Sans font files
└── images/                  App images and icons
src/
├── app/                     Routes and navigation layouts
│   ├── (tabs)/              Home and tab layout
│   └── design-system.tsx    Component gallery route
├── components/
│   ├── design-system/       Interactive gallery
│   └── ui/                  Shared UI primitives
├── hooks/                   Shared hooks
├── theme/                   Motion tokens
└── global.css               Colors, type, spacing, radii, and shadows
prompts/                     Implementation plans and history
AGENTS.md                    Project decisions and working conventions
```

## Working on Bard

Start with [AGENTS.md](AGENTS.md) for the project's conventions and service boundaries.

Keep visual tokens in `src/global.css`, use the shared `Text` and `Icon` primitives, and keep reusable components outside the route directory. Install packages with `npx expo install` and run lint and type checks before finishing a change.

For new features or changes across several files, write a plan in `prompts/` and get approval before implementation. Existing plans record how the foundation was built; `AGENTS.md` holds the lasting decisions.

---

<div align="center">

**Somewhere quiet. Somewhere cozy. Somewhere you.**<br />
<sub>That's the idea behind Bard.</sub>

</div>
