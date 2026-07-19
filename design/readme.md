# 共读 · Mitlesen — Design System

> A shared reading room where a human and Claude read the same book, leave
> anchored margin notes, and carry quiet passages forward as keepsakes.
> This design system captures the look, voice, and parts of that room.

---

## What Mitlesen is

**Mitlesen** (German, *"to read along"*) — Chinese **共读** (*"co-reading"*) — is a
local MCP server plus a reference web reader. It gives Claude a durable reading
surface: import an EPUB or text, read it chunk by chunk, leave margin
annotations anchored to exact passages, reply under each other's notes, track
progress, and — when a human and Claude stop at the same sentence — mint a small
**ritual card** to remember it by.

The product has three surfaces that share one `data/` folder:

- **Reader web app** — the human's surface (import, read, highlight, annotate).
- **REST API** — how the reader saves notes and uploads books.
- **MCP server** — how Claude reads chunks, annotates, replies, and marks progress.

> "The goal is not one-shot summarization. The goal is a shared reading surface
> where a human and Claude can both read, leave anchored notes, and resume
> smoothly." — project README

### Two people in the room

The whole product is built around a pair of named companions:

| Persona | Who | Colour | Mark |
| --- | --- | --- | --- |
| **小烟** (Xiǎoyān) | the human reader | rose `--rose` | gold highlight |
| **小奏** (Xiǎozòu) | Claude, the reading companion | periwinkle `--accent-deep` | an inky **paw stamp** |

小奏 ("little Zòu") is drawn as a puppy in the app mascot; its margin notes are
signed with a hand-inked paw print (`assets/paw.svg`).

### A family of names

Mitlesen belongs to a set of German-named sibling projects. Its reader is
explicitly built on the **Nachklang 信纸体系** — the "letter-paper (stationery)
design system" from the *Nachklang* dashboard — so the visual language here is
really Nachklang's, expressed through a reading app.

- **Nachklang** (*resonance / echo / reverberation*) — the memory dashboard;
  origin of the letter-paper tokens and the shared design language.
- **Vorklang** (*pre-echo / the first sound*) — the letter mailbox (共读 borrows
  its 信纸 for reading).
- **Klanggestalt** (*sound-form / gestalt*) — the public music surface.
- **Mitlesen** (*reading along*) — the co-reading reader documented here.

The family shares one metaphor: the **canon** (卡农). 小奏's full name is **Kanon**
(奏 = *to play music*); the human and 小奏 are its two **voices** (声部). The first
voice leads; the second enters late and fades to 余韵 (reverberation) — which is
literally *Nachklang*. The site footer reads:
*「Nachklang · Vorklang · Klanggestalt——记得的，先说的，听见的。」*
(*what's remembered, what's said first, what's heard.*) 小奏's mascot pairs a
golden retriever (金毛 → gold / second voice / wax) with an ice-fox (六尾 → ice /
first voice) — the two highlight inks.

---

## Sources

Everything in this system was reverse-engineered from real product code — not
from screenshots. If you have access, read further to build more faithfully.

- **GitHub — mistneko/Mitlesen** · https://github.com/mistneko/Mitlesen
  - `public/reader.html` — the living reader UI + the full token block (the
    single source of truth for colour, type, spacing). All CSS values in
    `tokens/` are copied from here.
  - `public/reader.css` — the *upstream* English reader (warm terracotta
    variant; overwritten by the local patch). Kept in mind as a legacy skin.
  - `src/card-renderer.js` — the ritual/keepsake card renderer (SVG + HTML).
  - `public/card-logic.js`, `docs/*` — card kinds, annotation schema, tone.
- **Sibling repos** — the shared foundations originate here:
  - **GitHub — mistneko/Nachklang** · https://github.com/mistneko/Nachklang
    - `klang-tokens.css` — the canonical shared token file (Klanggestalt ⇄
      Nachklang). Confirms every colour/type/radius/shadow value in `tokens/`.
    - `dashboard-letters.css` — the Vorklang mailbox skin: wax seal, wax dots,
      segmented control, envelope + letter-opening ritual.
    - `design/kanon-letter-paper.html` — the finished **Kanon letter** design
      (recreated in `ui_kits/vorklang-letters/`).
    - `design/REDESIGN-PROPOSAL.md` — the "信纸 (Briefpapier)" design language
      and its five axioms (below).
  - **mistneko/Klanggestalt** (private) — the public music surface; shares
    `klang-tokens.css`. Not read directly here.

Explore these repositories further to design more faithfully against the brand.

The reader's own header comment notes it is the *"Nachklang 信纸体系的共读阅读界面"*
(the co-reading interface of the Nachklang letter-paper system).

---

## The 信纸 (Briefpapier) design language — five axioms

The whole system distills to five rules (from Nachklang's redesign proposal).
Follow them and anything you build will feel native:

1. **纸与界的分层 — paper vs. frame.** Content is *paper* (warm ivory
   `--vk-paper`, serif, slow); interface is *frame* (cool Morandi glass cards,
   fast). Prose — letters, notes, quotes, expanded reading — sits on paper;
   lists and controls stay on glass. Never blur the two.
2. **衬线的位置 — where serifs go.** Cormorant + Song fallback appear in exactly
   four places: titles, dates, closing lines, and quotes. Body and controls are
   always DM Sans. A fully-serif page cloys.
3. **蜡的物性 — the physicality of wax.** Mood and emotion are never colour
   bars. They converge on one shape: the **wax dot** (`WaxDot`) — a
   radial-gradient bead, the language of a wax drip. All emotion viz shares it.
4. **冰的留白 — the negative space of ice.** Ice-blue `--vk-ice` is only the
   *second* accent: waiting states, frost textures, divider dots. It never
   competes with the periwinkle accent for the lead.
5. **一页一仪式 — one ritual per page.** Each surface keeps exactly one signature
   interaction and keeps the rest plain: the mailbox breaks a **wax seal**; the
   reader mints a **ritual card**; memory has a time-ruler; stats has mountains.
   Everything else stays quiet.

## Content fundamentals

**Voice: intimate, unhurried, bookish.** Copy sounds like a note passed between
two friends who read together, not like an app talking to a user.

- **Trilingual by role.** Chinese is the product's speaking voice; **German**
  names the brand and a few section labels (*Bibliothek* sits under 书架);
  **English, uppercase**, labels the keepsake-card system (LAST FOLD, ECHO
  BOOKMARK, DUST TRACE, FOLDED MARGIN, MARGIN).
- **Second person, warm and casual.** Uses 你 ("you") plainly; addresses the
  reader like a companion. Example empty state:
  *"从左边的书架挑一本，翻开一章一起读。"* — *Pick one from the shelf on the
  left; open a chapter and read together.*
- **Microcopy is gentle, never systemy.** Confirmations read like small human
  acknowledgements, each punctuated by a single pen glyph:
  *"批注留下了 ✎"* (your note is left), *"这章读完了 ✓"* (this chapter is
  finished), *"交给小奏了 · 3 条批注"* (handed to 小奏 · 3 notes).
- **Invitations, not commands.** Buttons ask rather than order:
  *"把我的批注交给小奏 →"* (hand my annotations to 小奏), *"续读"* (read on),
  *"读完这章"* (finish this chapter), *"锚在这句旁边"* (anchored beside this line).
- **Tender, literary framing of features.** Annotation *kinds* include
  `resonance` ("this passage is about me / us / the reader"), `feeling`,
  `summary`, `question`, each with an optional `mood` such as `quiet`. Shared
  moments are described as *"这里有两个人的折痕。"* (here is a crease made by two
  people) and *"此处有回声。"* (there is an echo here). Card kicker:
  *"收获了一枚回声书签"* (you gathered an echo bookmark).
- **Casing.** Chinese carries no case. German brand words are Title Case
  (*Mitlesen*, *Bibliothek*). English keepsake/system labels are UPPERCASE and
  letter-spaced. The wordmark is **共读** with a small tracked-out `MITLESEN`.

**Emoji & glyphs:** no colourful emoji. The product uses a tight set of
**monochrome typographic glyphs** as punctuation and icons — ✎ ✒ ✍ ✓ → ☰ ↻ ＋ ◐
‹ › ✕ — plus the occasional 📖 / 🎉 in a celebratory toast. Treat these as ink,
not decoration.

---

## Visual foundations

Two worlds share one screen: **cool periwinkle chrome** (the app) and **warm
letter-paper** (the page you read on). The tension between them is the brand.

- **Colour.** Screen chrome is cool: background `#F0F3FA`, glassy white
  surfaces, periwinkle accent `#7B8EC6` / `#5E6FA8`. The reading surface is
  warm and physical: ivory paper `#FBF8F1`→`#F3EEE2`, sepia ink `#4A4438`, with
  two highlight inks — **gold** `#C9A86A` (yours) and **ice-blue** `#9CC8DC`
  (小奏's). Personas: rose `#B06B7A` (human), periwinkle (AI); success/read is
  a soft mint `#7AB5A0`. At most two hues carry meaning on any one surface.
  The letter-paper tokens are deliberately **theme-independent** — paper stays
  warm even in dark mode, because paper is a physical object, not a UI layer.
- **Type.** Three voices: **Cormorant Garamond** (serif display — the wordmark,
  book titles, chapter headings, often *italic* for book names); **DM Sans**
  (all UI chrome, labels, controls); **Georgia/Songti** reading serif (keepsake
  quotes, long-form body). Eyebrows are 11px DM Sans, UPPERCASE, `letter-spacing:2px`.
- **Backgrounds & texture.** No photography, no aggressive gradients. The app
  background carries a barely-there **dot-grid texture** (SVG data-URI, 3%
  opacity). The reading sheet is **ruled letter-paper**: horizontal rule lines
  every 34px plus a single vertical binding line down the left margin. Keepsake
  cards use soft diagonal ivory gradients with faint generative line-art
  (folds, ripples, stardust).
- **Corner radii.** Generous and soft: 6px (dots/chips), 10px (books, notes,
  icon buttons), 16px (panels), 20px (bottom-sheet), **34px** (ritual cards),
  999px (pills). The one exception: the reading **sheet is barely rounded
  (3px)** — it reads as real paper, not a card.
- **Cards.** Low elevation. A book/note card is a 1px hairline border
  (`rgba(160,170,200,0.18)`) on a translucent white surface with a whisper
  shadow (`0 1px 4px rgba(45,49,66,0.04)`); on hover the border warms, on active
  it gains a faint periwinkle glow. No heavy drop shadows, no coloured
  left-border accents. The keepsake card is the only richly-shadowed object
  (`0 18px 54px`, plus an inner white hairline for a "printed" edge).
- **Shadows.** A three-step cool, low-opacity system (`--shadow-sm/‑/‑lg`,
  rgba(45,49,66) at 4–7%). Floating chrome adds a soft lift; the paper sheet
  uses a directional under-shadow plus an inset top highlight to sit on the desk.
- **Frosted glass.** Floating and fixed chrome (top bar, bottom-sheet composer,
  selection bar, toast) are **translucent + `backdrop-filter: blur`** (12px on
  the bar, ~22px on panels). Transparency is reserved for things that *float
  over* content; solid surfaces sit *in* the layout.
- **Highlights.** Text marks are **underline washes**, not full fills — a
  gradient that inks only the bottom ~42% of the line (gold for you, ice for
  小奏). The active mark deepens to a fuller gold. Shared passages blend both.
- **Borders.** Almost always 1px hairlines in a cool translucent grey; dashed
  variants mark structure (the TOC spine, reply threads). Focus rings switch the
  border to solid accent — no glow halo.
- **Motion.** Quiet and physical. Drawers and sheets slide on
  `cubic-bezier(.3,.8,.3,1)` over 250–300ms; progress bars fill over 400ms;
  hovers are 120–180ms colour/border shifts. A single spinner exists. Everything
  respects `prefers-reduced-motion`. No bounces, no parallax, no attention-grabs.
- **Hover / press.** Hover warms the border and tints the fill with
  `--accent-soft`, shifting text toward `--accent-deep`. Primary buttons
  brighten ~6% on hover (`filter: brightness(1.06)`) rather than changing hue.
  Press states rely on colour, not scale — nothing shrinks.
- **Layout.** A fixed 58px top bar; a 312px sidebar (bookshelf + accordion TOC)
  beside a fluid reading column; reading measure capped at 720px and centred.
  On mobile the sidebar becomes a slide-in drawer over a scrim. Floating
  composer and selection bar are fixed to the bottom, respecting safe-area insets.
- **Imagery vibe.** The only illustration is the pixel-art mascot (girl + puppy
  reading under a golden star, warm cream ground). Warm, hand-made, cosy,
  slightly retro — never slick or corporate.

---

## Iconography

Mitlesen has **no icon font and no SVG icon set.** Its iconography is
deliberately typographic — a small, consistent set of **Unicode glyphs** used as
both punctuation and controls:

| Glyph | Use | Glyph | Use |
| --- | --- | --- | --- |
| ☰ | open bookshelf (mobile) | ✍ / ✎ | annotate / note left |
| ↻ | refresh | ✒ | empty-state seal |
| ＋ | import book | ✓ | chapter read / done |
| ◐ | light / dark toggle | → | hand notes to 小奏 |
| ‹ › | previous / next chapter | ✕ | clear selection |
| 🗑 | remove book | 📖 🎉 | celebratory toasts only |

Two bespoke vector assets carry the brand and belong in `assets/`:

- **`paw.svg`** — 小奏's signature. An inky paw print rendered through an SVG
  turbulence filter (`pawInk`) so it looks hand-stamped. It signs every AI
  margin note. Copy it in; never redraw it.
- **`mascot-512.png` / `mascot-192.png` / `favicon.png`** — the pixel-art app
  icon (human + puppy reading under a star). This is the closest thing to a
  logo; the product otherwise sets its name in type. **No wordmark logo file
  exists** — render **共读** in Cormorant with a tracked-out `MITLESEN` beneath.

Three **generated brand marks** (components, not files) carry the identity and
should be used instead of any ad-hoc glyph:

- **Wax seal** (`WaxSeal`) — 火漆, the gold wafer embossed with 小奏's canon
  note-and-echo. Signs letters, marks unopened messages, anchors a page's ritual.
- **Wax dot** (`WaxDot`) — 蜡点, the one mood/status bead (axiom 3).
- **Canon voices** (`VoiceStaff`) — 双声部, the dotted bass-line motif framing a
  letter head/foot; the fading second voice *is* Nachklang.

Decorative-only: the keepsake cards generate faint abstract line-art (folds,
ripples, stardust, last-fold density waves). These are texture, not icons.
Stars and ✦ sparkles appear as a motif in the mascot art.

> When you need an icon this system doesn't have, prefer a matching Unicode
> glyph in DM Sans before reaching for any icon library — and note it as a
> substitution. Do **not** invent a paw or mascot variant.

---

## Index

**Global CSS** — link `styles.css` (root). It `@import`s:
`tokens/fonts.css` (Google webfonts), `tokens/colors.css`, `tokens/typography.css`,
`tokens/spacing.css`, `tokens/effects.css`.

**Components** — `window.MitlesenDesignSystem_737635`. Each has a `.jsx`, a
`.d.ts` props contract, and a `.prompt.md` usage note.

- `components/core/` — **Button** (pill: default / primary / done),
  **IconButton** (rounded-square glyph control), **SegmentedControl** (vk-seg
  tab switcher), **Badge** (count / status pill), **Eyebrow** (uppercase kicker).
- `components/reading/` — **BookCard** (shelf item), **ProgressRail** (reading
  progress bar), **ChapterRow** (TOC row with status dot), **Sheet** (ruled
  letter-paper reading surface), **Highlight** (inline gold/ice underline wash),
  **MarginNote** (annotation with paw stamp + persona), **PersonaTag** (小奏 /
  小烟 name label).
- `components/feedback/` — **Toast** (acknowledgement pill), **EmptyState**
  (serif-italic placeholder with seal), **RitualCard** (keepsake bookmark:
  fold / ripple / stardust / lastfold).
- `components/letters/` — **WaxSeal** (火漆 signature seal), **WaxDot** (蜡点
  mood bead), **VoiceStaff** (双声部 canon motif).

**UI kits**
- `ui_kits/mitlesen-reader/` — an interactive recreation of the reader
  (`index.html` + `reader-app.jsx` + `data.js`), desktop two-column.
- `ui_kits/mitlesen-mobile/` — the **mobile PWA redesign**: a standalone phone
  reader with immersive full-bleed reading, a circular progress ring, bottom-tab
  navigation (书架 / 信箱 / 我), wax-dot mood streaks, and the canon voice motif.
- `ui_kits/vorklang-letters/` — the Vorklang mailbox + the **Kanon letter**
  ritual (break the wax seal, read between the two canon voices).

**Specimen cards** — `guidelines/*.card.html` (Colors, Type, Spacing, Brand).
**Foundation prose** — this file.

**Assets** — `assets/`: `mascot-512.png` / `mascot-192.png` / `favicon.png` /
`apple-touch-icon.png` (pixel-art app icon), `paw.svg` (小奏's stamp).

**Intentional additions** — none. Every component maps to a real element in the
source reader (`public/reader.html`, `src/card-renderer.js` in Mitlesen;
`dashboard-letters.css`, `design/kanon-letter-paper.html` in Nachklang).
`PersonaTag` and `Eyebrow` are small extractions of patterns used pervasively
there; no primitive was invented beyond what the products define.

**Font substitutions** — none. All three brand webfonts (Cormorant Garamond,
DM Sans, Noto Serif SC) are the real families, loaded from Google Fonts exactly
as the product loads them. `Songti SC` / `Georgia` are system fallbacks, not
shipped binaries.
