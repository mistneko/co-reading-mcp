---
name: mitlesen-design
description: Use this skill to generate well-branded interfaces and assets for 共读 · Mitlesen (a co-reading room shared by a human, 小烟, and Claude, 小奏), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map

- `readme.md` — the full design guide: product context, content & visual foundations, iconography, and an index of everything here. **Start here.**
- `styles.css` — the single global entry point. Link this one file; it `@import`s all tokens (`tokens/`) and the three Google webfonts. Every design decision is a CSS custom property (`--accent`, `--vk-paper`, `--font-serif`, …).
- `components/` — reusable React primitives (`core/`, `reading/`, `feedback/`, `letters/`), each with a `.jsx`, a `.d.ts` props contract, and a `.prompt.md` usage note. Namespace: `window.MitlesenDesignSystem_737635`. The `letters/` group holds the signature atoms — `WaxSeal` (火漆), `WaxDot` (蜡点), `VoiceStaff` (双声部 canon).
- `ui_kits/` — interactive recreations: `mitlesen-reader/` (desktop reading room), `mitlesen-mobile/` (the mobile PWA redesign), and `vorklang-letters/` (the mailbox + Kanon letter ritual). The best reference for how the pieces compose.
- `guidelines/` — foundation specimen cards (colours, type, spacing, brand).
- `assets/` — the pixel-art mascot, favicons, and `paw.svg` (小奏's signature stamp). No wordmark logo exists — set 共读 in the serif.

## Brand in one breath

Two worlds on one screen: **cool periwinkle chrome** (`#F0F3FA` bg, `#7B8EC6` accent) meets **warm letter-paper** (`#FBF8F1` paper, `#4A4438` ink, gold + ice highlights). Voice is intimate, unhurried, bookish — Chinese primary, German brand names, English keepsake labels. Icons are Unicode glyphs, never an icon font. Emoji are monochrome pen glyphs only. When in doubt, reach for the quietest option.
