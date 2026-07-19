**SegmentedControl** — the vk-seg pill switcher for tabs / sub-views; the selected pill fills with the accent tint, and options can carry counts.

```jsx
<SegmentedControl
  value={tab}
  onChange={setTab}
  options={[
    { value: "unread", label: "未拆", count: 3 },
    { value: "opened", label: "已拆" },
    { value: "sent", label: "寄出" },
  ]}
/>
```
