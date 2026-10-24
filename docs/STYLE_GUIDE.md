# Casebook style guide

Inspired by the playful, readable feel of profanity.dev (rounded, friendly, one strong accent, a "try it" demo beside the hero) but adapted to an investigation theme: paper, ink and a stamp-red accent. We borrow the approach, not the palette.

## Principles

1. **Friendly, not edgy.** Serious subject, approachable tone. Short sentences, plain words.
2. **One accent.** Stamp red is used for the primary action, the check marks and highlighted keywords. Everything else is paper and ink.
3. **Show it working.** The hero always has a small demo card next to the pitch.
4. **Evidence feel.** Dashed "evidence" boxes, tab-like labels such as CASE, hand-written margin notes.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--paper` | `oklch(0.965 0.012 85)` | Page background (warm paper) with a faint dot grid |
| `--paper-2` | `oklch(0.935 0.016 85)` | Panels |
| `--card` | `oklch(0.99 0.006 85 / 0.7)` | Cards, with a light backdrop blur |
| `--ink` | `oklch(0.2 0.02 265)` | Text, headings, secondary buttons |
| `--muted` | `oklch(0.5 0.02 265)` | Secondary text |
| `--line` | `oklch(0.86 0.014 85)` | Borders |
| `--stamp` | `oklch(0.58 0.215 25)` | Accent: primary buttons, checks, highlighted words |
| `--radius` | `0.5rem` | Buttons, inputs; cards use `rounded-xl` |

Contrast: ink on paper is above 14:1. Stamp text on paper is used only for large or bold text (3:1 or better), and body text never uses it.

## Type

- **Recursive** (variable, Google Fonts) for everything. Bold 700 for headings, 500 for UI, 400 for body.
- **Caveat** only for margin notes and annotations, never for content.
- Mono (system) for domains, IPs, hashes.
- Scale: hero `text-5xl` to `text-7xl`, body `text-lg` for lead copy and `text-sm` in cards.

## Components

- **Primary button:** stamp background, `rounded-md`, `px-4 py-2`, `text-sm font-medium`.
- **Secondary button:** ink background, paper text.
- **Inputs:** white, 1px line border, `rounded-md`.
- **Highlighted keyword:** class `.mark-word` (stamp, uppercase, extra bold). Maximum two per paragraph.
- **Evidence empty state:** dashed 2px border, muted text, centred.
- **Checklist:** stamp check mark then medium-weight text.
- **Annotation:** Caveat in stamp red, rotated about -4 degrees, pointing at the demo card, hidden from screen readers.
- **Header:** sticky, paper at 80% with blur, one ink button on the right.

## Motion and accessibility

- Motion is minimal: hover colour changes and a short fade. Everything is disabled under `prefers-reduced-motion`.
- Focus rings are visible on every interactive element.
- Decorative emoji and annotations use `aria-hidden`.
- Light theme first. A dark theme (ink background, paper text, same stamp red) comes after launch.

## Copy voice

Direct and a bit wry. "Scattered and unprovable. Not anymore." Claims must be true: if a feature is not shipped, label it "Coming soon".
