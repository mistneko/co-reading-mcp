# UI Kit — 共读 · Mitlesen Reader

An interactive recreation of the Mitlesen co-reading room, composed entirely
from this design system's components. It is a *view of the product*, not a
storybook.

## Run it

Open `index.html` (it loads `styles.css`, the compiled `_ds_bundle.js`, sample
content, then the app). No build step.

## Files

- `index.html` — app shell + chrome CSS (top bar, rail, reading column,
  floating selection bar / composer / card panel), grounded in the real
  `public/reader.html` layout. Loads everything and mounts the app.
- `reader-app.jsx` — the interactive app. Holds all state and composes the DS
  primitives: `BookCard`, `ChapterRow`, `Sheet`, `Highlight`, `MarginNote`,
  `Button`, `IconButton`, `Eyebrow`, `Toast`, `EmptyState`, `RitualCard`.
- `data.js` — neutral sample content (books → chunks → seeded annotations),
  shaped like the product's real data format.

## What you can do

- **Pick a book** from the Bibliothek shelf → its chapters accordion opens.
- **Read** on the ruled letter-paper sheet; 小奏's and your highlights are inked
  gold / ice-blue.
- **Select any passage** → the selection bar rises → **✍ 批注** opens the
  composer → **留下批注** drops a new margin note (marked "未交" / unsubmitted).
- **把我的批注交给小奏 →** submits your open notes.
- **读完这章** marks the chapter read; if the page carries notes, it mints a
  **ritual card** keepsake.
- Toggle **◐** for dark mode; the screen chrome cools while the paper stays warm.

## Fidelity notes

Copy, layout, spacing, and colour are lifted from the source. Behaviour is
cosmetic (no server, no real import); the annotation flow, progress, and card
ritual are simulated in local state to demonstrate the interactions.
