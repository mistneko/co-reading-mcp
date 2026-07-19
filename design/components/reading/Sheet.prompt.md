**Sheet** — the warm, ruled letter-paper surface you read on: ivory gradient, a left binding line, horizontal rules. Barely rounded (3px) so it reads as paper, not a card. Put text and `Highlight` marks inside.

```jsx
<Sheet>
  It was the best of times, it was the{" "}
  <Highlight by="ai">worst of times</Highlight>, it was the age of wisdom…
</Sheet>
```

Set `ruled={false}` to drop the rule lines. The reading column caps at ~720px (`--reading-measure`).
