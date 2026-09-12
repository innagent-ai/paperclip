// innagent: status derivados dos tokens da marca
# Individual and Status Capsules

Use this reference for product UI, onboarding, org surfaces, and heartbeat status indicators.

## Source Precedence

1. `ui/src/components/AgentCapsule.tsx` - React API, states, sizes, accessibility, gradient wrapping.
2. `ui/src/index.css` - animation timings, reduced-motion behavior, agent gradient token values.
3. `ui/src/lib/status-colors.ts` - heartbeat status color/motion mapping.
4. `ui/src/components/OnboardingWizard.tsx` and `ui/src/pages/DesignGuide.tsx` - accepted usage examples.
5. Website brand guide files under `paperclip-website/src/components/brand/sections/*` - marketing rules and the 12-preset website palette.

## Individual Agent Capsule

One tall capsule represents one agent. Do not use this component for decoration or generic status chips.

States:

| State | Meaning | Rendering |
| --- | --- | --- |
| `slot` | Empty agent slot | Dashed outline, gentle pulse |
| `configured` | Agent named/model picked, not live | Solid stroke, no fill |
| `online` | Agent online | Gradient liquid rise, then breathing pulse |

Implementation rules:

- Keep the same DOM node through lifecycle flows when the story is "this agent comes to life".
- Use stacked layers with opacity transitions for dashed-to-solid; CSS cannot animate `border-style`.
- Online default pulse is green. The blue pulse is a specific onboarding wizard variant, not the default app-wide live state.
- Product sizes are `sm` 24x60, `md` 34x84, `lg` 46x116. Custom sizes should keep height at least twice width.
- The capsule radius is full stadium/pill radius.
- Accessibility label should describe the represented agent or state.

Motion:

| Motion | Timing |
| --- | --- |
| Slot pulse | `1.6s ease-in-out infinite` |
| Liquid rise | `1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards` |
| Online pulse | `1.8s ease-in-out infinite` |
| Layer transition | `opacity 0.5s ease` |

Reduced motion:

- Remove slot pulse and online pulse.
- Remove layer transition.
- Render the online liquid at full height without rise animation.

## App Agent Gradient Tokens

The app component currently exposes 10 gradient pairs. `AgentCapsule` wraps out-of-range gradient indexes back into `1..10`.

| Index | Top token | Top | Bottom token | Bottom |
| --- | --- | --- | --- | --- |
| 1 | `--agent-1a` | `#FFCEC9` | `--agent-1b` | `#3A7647` |
| 2 | `--agent-2a` | `#87BCFF` | `--agent-2b` | `#FF726A` |
| 3 | `--agent-3a` | `#00234B` | `--agent-3b` | `#82000F` |
| 4 | `--agent-4a` | `#E2F552` | `--agent-4b` | `#ACBB00` |
| 5 | `--agent-5a` | `#005DB5` | `--agent-5b` | `#579E69` |
| 6 | `--agent-6a` | `#869300` | `--agent-6b` | `#620009` |
| 7 | `--agent-7a` | `#75B2FF` | `--agent-7b` | `#FF726A` |
| 8 | `--agent-8a` | `#ABE3B2` | `--agent-8b` | `#55A1FF` |
| 9 | `--agent-9a` | `#C1D21E` | `--agent-9b` | `#005DB5` |
| 10 | `--agent-10a` | `#D4E640` | `--agent-10b` | `#6DB7B6` |

Do not treat these as the universal Paperclip capsule palette. The website brand guide exposes 12 presets, the video references have a separate 12-gradient palette, and the hero bank has 45 gradients.

## Website Marketing Capsule Palette

The website palette extends the app's first 10 gradients with two more presets:

| Index | Top | Bottom | Description |
| --- | --- | --- | --- |
| 11 | `#9FC9FF` | `#004386` | peri -> mauve |
| 12 | `#6BB5B3` | `#579E69` | teal -> green |

Marketing capsule rules:

- Capsule visuals are reserved for agent representation: capsule fields, org-chart nodes, status indicators, avatars.
- Never use capsules on chrome, buttons, or generic pills.
- Use a `1 : >= 2` proportion and a top-to-bottom gradient for gradient capsules.
- Flat single-color capsules are allowed only where a solid mark is needed.
- The guide names a semantic `--r-capsule`, but current `brand.css` does not export a concrete `--r-capsule` variable. Do not cite it as a live CSS token without checking.

## Heartbeat Status Capsule

Heartbeat status capsules are small solid pills. They are a different surface from individual gradient capsules.

Status mapping:

| Agent status | Color | Fill | Motion |
| --- | --- | --- | --- |
| `idle` | gray | `#ACADAF` light, `#696A6B` dark | none |
| `active` | gray | same as idle | none |
| `running` | blue | `#106FD0` | `hb-pulse` |
| `paused` | amber | `#B0C000` | none |
| `error` | red | `#D53537` | `hb-blink` |

Motion timings:

- `hb-pulse`: `1.6s ease-in-out infinite`
- `hb-blink`: `1.2s step-end infinite`
- Reduced motion removes both.

Website guide geometry for the heartbeat pill is 8x16 with radius 4. Larger brand-page display examples may use 14x28.

## Common Mistakes

- Using capsule gradients for generic badges or buttons.
- Using a full gradient agent capsule where a small status capsule is required.
- Treating the onboarding blue glow as the default online state.
- Merging the 10 app gradients, 12 website gradients, 12 video gradients, and 45 hero-bank gradients into one palette.
- Animating status or lifecycle motion without reduced-motion fallbacks.
