import React from "react";

const CSS = `
.mds-eyebrow{display:block;font-family:var(--font-sans);font-size:var(--text-xs);font-weight:var(--weight-regular);letter-spacing:var(--tracking-eyebrow);text-transform:uppercase;color:var(--text-faint);margin:0}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-eyebrow-css")) {
  const el = document.createElement("style");
  el.id = "mds-eyebrow-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Small uppercase, letter-spaced kicker that sits above a heading (书架,
 * 页边批注, section labels). The system's quietest label voice.
 */
export function Eyebrow({ as: Tag = "span", className = "", children, ...rest }) {
  return (
    <Tag className={["mds-eyebrow", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}
