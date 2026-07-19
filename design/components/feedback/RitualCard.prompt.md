**RitualCard** — the keepsake bookmark the reader mints for a shared margin, a resonant note, or a finished book. Four art moods on warm printed paper; the line-art is deterministic per `seed`.

```jsx
<RitualCard
  art="ripple"
  title="The Anthropic Guidelines"
  subtitle="Anthropic · On honesty"
  quote="this line matters because I found myself in it"
  note="Read together, once at the same sentence."
  footer="此处有回声。"
/>
<RitualCard art="lastfold" size="tall" title="Letters to a Young Poet" quote="The book is closed, but the margins are still awake." />
```

`art`: `fold` (folded margin) / `ripple` (echo bookmark) / `stardust` (dust trace) / `lastfold` (a finished book). `size`: `compact` / `standard` / `tall`. Fixed 360px wide — center it on a soft ground.
