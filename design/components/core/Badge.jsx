import React from "react";

const CSS = `
.mds-badge{display:inline-flex;align-items:center;gap:3px;font-family:var(--font-sans);font-size:var(--text-2xs);line-height:1.4;white-space:nowrap;vertical-align:middle}
.mds-badge--accent{color:var(--accent-deep);background:var(--accent-soft);border-radius:var(--radius-pill);padding:1px 6px}
.mds-badge--gold{color:var(--vk-ink-dim);background:rgba(201,168,106,.16);border-radius:var(--radius-pill);padding:1px 7px}
.mds-badge--rose{color:var(--rose);background:var(--rose-soft);border-radius:var(--radius-pill);padding:1px 7px}
.mds-badge--plain{color:var(--accent-deep);font-size:var(--text-xs)}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-badge-css")) {
  const el = document.createElement("style");
  el.id = "mds-badge-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Tiny status pill / count marker. `gold` marks an unsubmitted note ("未交"),
 * `accent` a periwinkle annotation count, `rose` a human-side marker, `plain`
 * a bare coloured count with no pill.
 */
export function Badge({ tone = "accent", className = "", children, ...rest }) {
  const classes = ["mds-badge", `mds-badge--${tone}`, className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
