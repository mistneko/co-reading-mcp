**Button** — the fully-rounded pill control used throughout Mitlesen's chrome; use `primary` for the one main action, `default` for everything else, `done` to show a finished/read state.

```jsx
<Button variant="primary" icon="→">把我的批注交给小奏</Button>
<Button>续读</Button>
<Button variant="done" icon="✓">已读</Button>
<Button variant="primary" size="sm">批注</Button>
```

Variants: `default` (ghost), `primary` (periwinkle gradient), `done` (mint). Sizes: `sm` / `md` / `lg`. `block` stretches full-width. `icon` takes a Unicode glyph (this brand has no icon font). Passes through all native `<button>` props including `disabled`.
