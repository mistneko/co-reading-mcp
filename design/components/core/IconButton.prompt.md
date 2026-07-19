**IconButton** — a rounded-square button holding one Unicode glyph; use for top-bar / rail actions where a pill label would be too heavy. Always pass an accessible `label`.

```jsx
<IconButton label="书架">☰</IconButton>
<IconButton label="导入 EPUB / TXT">＋</IconButton>
<IconButton label="明暗" bare>◐</IconButton>
<IconButton label="刷新" size="sm">↻</IconButton>
```

`size`: `sm` (30px) / `md` (36px). `bare` removes the chrome until hover. Mitlesen has no icon font — pass a glyph as the child.
