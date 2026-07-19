import React from "react";

const CSS = `
.mds-iconbtn{width:36px;height:36px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg2);color:var(--text-mid);font-size:16px;display:inline-flex;align-items:center;justify-content:center;flex:none;transition:var(--dur-fast);cursor:pointer;padding:0;font-family:var(--font-sans);line-height:1}
.mds-iconbtn:hover:not(:disabled){background:var(--accent-soft);color:var(--accent-deep);border-color:var(--border-hover)}
.mds-iconbtn:disabled{opacity:.4;cursor:default}
.mds-iconbtn--sm{width:30px;height:30px;font-size:14px}
.mds-iconbtn--bare{border-color:transparent;background:transparent}
.mds-iconbtn--bare:hover:not(:disabled){background:var(--accent-soft)}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-iconbutton-css")) {
  const el = document.createElement("style");
  el.id = "mds-iconbutton-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Rounded-square icon button holding a single Unicode glyph (☰ ↻ ＋ ◐ ✕).
 * The soft-cornered counterpart to the fully-round {@link Button}; used for
 * top-bar and rail controls.
 */
export function IconButton({ size = "md", bare = false, label, className = "", children, ...rest }) {
  const classes = [
    "mds-iconbtn",
    size !== "md" ? `mds-iconbtn--${size}` : "",
    bare ? "mds-iconbtn--bare" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} aria-label={label} title={label} {...rest}>
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
