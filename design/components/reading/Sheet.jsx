import React from "react";

const CSS = `
.mds-sheet{position:relative;background:var(--grad-paper);border:1px solid var(--border);border-radius:var(--radius-sheet);padding:34px 30px 30px 46px;box-shadow:var(--shadow-sheet)}
.mds-sheet::before{content:'';position:absolute;left:30px;top:20px;bottom:20px;width:1px;background:rgba(176,110,90,.28)}
.mds-sheet__text{font-family:var(--font-serif);font-size:var(--reading-size);line-height:var(--reading-leading);color:var(--vk-ink);white-space:pre-wrap;word-break:break-word;background:var(--texture-rule);background-position:0 25px}
.mds-sheet--plain .mds-sheet__text{background:none}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-sheet-css")) {
  const el = document.createElement("style");
  el.id = "mds-sheet-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * The letter-paper reading surface (信纸): warm ivory gradient, a vertical
 * binding line down the left margin, and faint horizontal rules the text sits
 * on. Put chunk text — with inline {@link Highlight} marks — inside.
 */
export function Sheet({ ruled = true, className = "", children, ...rest }) {
  const classes = ["mds-sheet", ruled ? "" : "mds-sheet--plain", className].filter(Boolean).join(" ");
  return (
    <article className={classes} {...rest}>
      <div className="mds-sheet__text">{children}</div>
    </article>
  );
}
