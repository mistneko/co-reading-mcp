import React from "react";

const CSS = `
.mds-mark{color:inherit;cursor:pointer;border-radius:1px;padding:0 1px;transition:background var(--dur-fast);background:var(--mark-human)}
.mds-mark--ai{background:var(--mark-ai)}
.mds-mark--active{background:var(--mark-active)}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-highlight-css")) {
  const el = document.createElement("style");
  el.id = "mds-highlight-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * An inline passage highlight — an *underline wash* (ink on the bottom ~42% of
 * the line), gold for the human, ice-blue for 小奏. Use inside a {@link Sheet}.
 */
export function Highlight({ by = "human", active = false, className = "", children, ...rest }) {
  const classes = [
    "mds-mark",
    by === "ai" ? "mds-mark--ai" : "",
    active ? "mds-mark--active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <mark className={classes} {...rest}>
      {children}
    </mark>
  );
}
