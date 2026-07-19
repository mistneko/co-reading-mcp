**WaxDot** — 蜡点, the one shape the system uses for mood and status: a small wax-bead dot, never a colour bar. Colour it to encode emotion (valence) or category; `hollow` = empty/unread.

```jsx
<WaxDot tone="rose" />        {/* warm feeling */}
<WaxDot tone="mint" size={9} />  {/* read / positive */}
<WaxDot hollow />             {/* unread */}
```

Prefer this over any coloured bar/stripe for emotion or category marking.
