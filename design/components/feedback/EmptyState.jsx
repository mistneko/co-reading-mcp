import React from "react";

const CSS = `
.mds-empty{margin:auto;text-align:center;color:var(--text-dim);font-family:var(--font-serif);font-style:italic;font-size:var(--text-lg);line-height:1.5;padding:40px}
.mds-empty__seal{font-size:34px;margin-bottom:12px;opacity:.5;font-style:normal}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-empty-css")) {
  const el = document.createElement("style");
  el.id = "mds-empty-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * A quiet, serif-italic empty state topped by a large seal glyph. Used for the
 * empty shelf and the "pick a book" reading placeholder.
 */
export function EmptyState({ seal = "✒", className = "", children, ...rest }) {
  return (
    <div className={["mds-empty", className].filter(Boolean).join(" ")} {...rest}>
      {seal ? <div className="mds-empty__seal" aria-hidden="true">{seal}</div> : null}
      <div>{children}</div>
    </div>
  );
}
