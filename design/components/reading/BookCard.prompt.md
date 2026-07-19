**BookCard** — a shelf item showing a book's title, author, reading progress, and annotation count; mark the open book with `active`. Composes `ProgressRail`.

```jsx
<BookCard
  title="The Anthropic Guidelines"
  author="Anthropic"
  read={3}
  total={12}
  annotationCount={5}
  active
  onClick={() => open(book)}
  onDelete={() => remove(book)}
/>
```

`onDelete` (optional) reveals a quiet 🗑 on hover. Stack these with `gap` in the shelf rail.
