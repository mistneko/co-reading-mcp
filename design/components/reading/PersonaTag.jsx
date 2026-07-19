import React from "react";

const CSS = `
.mds-persona{font-family:var(--font-sans);font-weight:var(--weight-semibold);font-size:var(--text-xs)}
.mds-persona--ai{color:var(--persona-ai)}
.mds-persona--human{color:var(--persona-human)}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-persona-css")) {
  const el = document.createElement("style");
  el.id = "mds-persona-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * The name label for one of the two readers: 小奏 (Claude, periwinkle) or
 * 小烟 (the human, rose). Defaults the name from the persona; override with
 * `name` for a different reader.
 */
export function PersonaTag({ persona = "ai", name, className = "", ...rest }) {
  const label = name || (persona === "human" ? "小烟" : "小奏");
  return (
    <span className={["mds-persona", `mds-persona--${persona}`, className].filter(Boolean).join(" ")} {...rest}>
      {label}
    </span>
  );
}
