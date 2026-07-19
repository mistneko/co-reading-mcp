**ChapterRow** — one line in the TOC accordion; the leading dot encodes reading state (filled mint = read, hollow = unread), and `current` highlights the active chapter.

```jsx
<ChapterRow title="Claude and the mission of Anthropic" read />
<ChapterRow title="On honesty" current annotationCount={2} />
<ChapterRow title="The finish ritual" />
```
