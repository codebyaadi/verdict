# Casebook style guide

Casebook uses the **Lookfar design system** (the full guide lives in the Lookfar repo as `STYLE_GUIDE.md`): hairline translucent borders, glass panels, fully rounded controls, heavy tight headlines, Tailwind v4 and shadcn/ui, Sora and Geist Mono. Only the **colour** changes. Each of the author's products has its own hue so they never look alike:

| Product | Hue |
|---|---|
| Lookfar | amber |
| Avni | lavender |
| Upzy | teal |
| **Casebook** | **raspberry** (rose-magenta) |

Everything not listed here follows the Lookfar guide.

## Tokens (raspberry)

| Token | Light | Dark |
|---|---|---|
| `background` | `#fcf3f6` | `#120a0e` |
| `foreground` | `#1f1217` | `#f8ecf1` |
| `card` / `popover` | `#ffffff` | `#1e1218` |
| `primary` | `#3d1226` | `#f9cfe0` |
| `primary-foreground` | `#ffffff` | `#2a0f1c` |
| `muted-foreground` | `#6b5861` | `#b19ca6` |
| `accent` | `rgba(190,40,100,.13)` | `rgba(255,127,174,.18)` |
| `accent-foreground` | `#5c1038` | `#fde0ec` |
| `brand` (the one accent) | `#b4235f` | `#ff7fae` |
| `border` | `rgba(31,18,23,.12)` | `rgba(255,190,215,.14)` |
| `input` | `rgba(31,18,23,.17)` | `rgba(255,190,215,.19)` |
| `ring` | `#b4235f` | `#ff7fae` |
| `destructive` | `#b3261e` | `#ff9a8a` |

Ambient glows: `--blob-1` / `--blob-2` in `globals.css`. Panel shadow: `--shadow-panel`.

Errors use `destructive` (an orange-red), which is deliberately a different hue from the raspberry `brand`, so an error never looks like a normal accent.

## Applied here

- Fonts: **Sora** (`--font-sora`) and **Geist Mono** (`--font-geist-mono`) through `next/font/google`.
- Theme: `next-themes`, class strategy, system by default.
- shadcn components in `web/src/components/ui` are patched to the Lookfar shapes: pill buttons (`rounded-full`, `h-10`), pill inputs, `rounded-3xl` glass cards (`bg-card/70 backdrop-blur-xl`).
- Page shells use the `ambient` class; the nav is a floating pill with glass.
- Logo: a case-file folder tab with a dot, in a `bg-primary` rounded tile, plus an extra-bold wordmark with a raspberry full stop (`web/src/components/logo.tsx`, `web/src/app/icon.svg`).
- Unfinished features are labelled "Coming soon", never shown as live.

## Rules that matter most

1. One primary button per view.
2. Headlines are `font-extrabold tracking-tighter`; one phrase per section in `text-brand`.
3. Colours come from tokens only: no hard-coded hex, no `gray-*`.
4. Visible focus ring on every interactive element; icon-only buttons need `aria-label`.
5. Respect `prefers-reduced-motion`.
