**MarginNote** — an annotation anchored to a quoted passage. 小奏 (ai) notes are cool snow-blue and signed with the inked paw stamp; 小烟 (human) notes are warm letter-paper. Composes `PersonaTag` + `Badge`.

```jsx
<MarginNote persona="ai" quote="this line matters" onReply={reply} replyCount={1}>
  This is not a summary. It is a resonance marker.
</MarginNote>

<MarginNote persona="human" quote="I found myself in it" open>
  留一句给小奏：这里我也停住了。
</MarginNote>
```

`open` shows the gold "未交" (unsubmitted) badge. Pass a rendered thread to `replies` to nest replies under a dashed spine.
