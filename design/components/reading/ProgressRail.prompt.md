**ProgressRail** — a thin reading-progress bar (periwinkle gradient on a soft track); give it `read`/`total` or a `value` percentage.

```jsx
<ProgressRail read={3} total={12} showLabel />
<ProgressRail value={65} />
```

Used inside `BookCard`, but works standalone anywhere progress is shown.
