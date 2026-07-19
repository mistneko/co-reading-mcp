import React from "react";
import { ProgressRail } from "./ProgressRail.jsx";

const CSS = `
.mds-book{position:relative;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px 13px;cursor:pointer;transition:var(--dur);box-shadow:var(--shadow-sm);text-align:left;width:100%;font-family:var(--font-sans);color:inherit}
.mds-book:hover{border-color:var(--border-hover)}
.mds-book--active{border-color:var(--accent-med);background:var(--surface-hover);box-shadow:var(--shadow-book-active)}
.mds-book__title{font-family:var(--font-serif);font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:var(--leading-snug);color:var(--text)}
.mds-book__sub{font-size:12px;color:var(--text-dim);margin-top:2px;font-style:italic;font-family:var(--font-serif)}
.mds-book__meta{display:flex;align-items:center;gap:8px;margin-top:9px}
.mds-book__ann{font-size:var(--text-xs);color:var(--accent-deep);white-space:nowrap}
.mds-book__del{position:absolute;top:8px;right:8px;width:22px;height:22px;border:none;background:transparent;color:var(--text-faint);border-radius:var(--radius-xs);font-size:var(--text-sm);display:none;align-items:center;justify-content:center;cursor:pointer}
.mds-book:hover .mds-book__del{display:inline-flex}
.mds-book__del:hover{background:var(--rose-soft);color:var(--rose)}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-bookcard-css")) {
  const el = document.createElement("style");
  el.id = "mds-bookcard-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * A book on the shelf: serif title, italic author, a progress rail with a
 * read/total count and an optional annotation tally. Hovering reveals a quiet
 * delete affordance when `onDelete` is provided.
 */
export function BookCard({
  title,
  author,
  read = 0,
  total = 0,
  annotationCount = 0,
  active = false,
  onDelete,
  className = "",
  ...rest
}) {
  const classes = ["mds-book", active ? "mds-book--active" : "", className].filter(Boolean).join(" ");
  return (
    <div className={classes} role="button" tabIndex={0} {...rest}>
      {onDelete ? (
        <button
          type="button"
          className="mds-book__del"
          aria-label="移除"
          title="移除"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
        >
          🗑
        </button>
      ) : null}
      <div className="mds-book__title">{title}</div>
      {author ? <div className="mds-book__sub">{author}</div> : null}
      <div className="mds-book__meta">
        <ProgressRail read={read} total={total} showLabel />
        {annotationCount ? <span className="mds-book__ann">✎{annotationCount}</span> : null}
      </div>
    </div>
  );
}
