import React from "react";

const CSS = `
.mds-chap{display:flex;align-items:center;gap:8px;padding:7px 9px;border-radius:8px;cursor:pointer;color:var(--text-mid);font-family:var(--font-sans);font-size:var(--text-sm);transition:var(--dur-fast);border:0;background:transparent;width:100%;text-align:left}
.mds-chap:hover{background:var(--accent-soft);color:var(--text)}
.mds-chap--current{background:var(--accent-med);color:var(--accent-deep);font-weight:var(--weight-semibold)}
.mds-chap__dot{width:9px;height:9px;border-radius:50%;flex:none;border:1.5px solid var(--text-faint);background:transparent}
.mds-chap--read .mds-chap__dot{border:none;background:radial-gradient(circle at 35% 30%, rgba(255,255,255,.5) 0 18%, transparent 40%), var(--mint);box-shadow:0 1px 2px rgba(45,49,66,.25)}
.mds-chap__name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mds-chap__ann{font-size:var(--text-2xs);color:var(--accent-deep);background:var(--accent-soft);border-radius:var(--radius-pill);padding:1px 6px}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-chapterrow-css")) {
  const el = document.createElement("style");
  el.id = "mds-chapterrow-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * One row in the table-of-contents accordion. A status dot shows read (filled
 * mint), unread (hollow ring), and `current` (highlighted row). Optional
 * annotation count on the right.
 */
export function ChapterRow({ title, read = false, current = false, annotationCount = 0, className = "", ...rest }) {
  const classes = [
    "mds-chap",
    read ? "mds-chap--read" : "",
    current ? "mds-chap--current" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={classes} {...rest}>
      <span className="mds-chap__dot" aria-hidden="true" />
      <span className="mds-chap__name">{title}</span>
      {annotationCount ? <span className="mds-chap__ann">{annotationCount}</span> : null}
    </button>
  );
}
