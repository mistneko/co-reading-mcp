import React from "react";

const CSS = `
.mds-btn{font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-regular);border:1px solid var(--border);background:var(--bg2);color:var(--text-mid);border-radius:var(--radius-pill);padding:7px 15px;transition:var(--dur-fast);white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;gap:6px;line-height:1;cursor:pointer}
.mds-btn:hover:not(:disabled){background:var(--accent-soft);color:var(--accent-deep);border-color:var(--border-hover)}
.mds-btn:disabled{opacity:.4;cursor:default}
.mds-btn--primary{background:var(--grad-accent);color:var(--text-on-accent);border-color:transparent;font-weight:var(--weight-medium)}
.mds-btn--primary:hover:not(:disabled){filter:brightness(1.06);color:var(--text-on-accent)}
.mds-btn--done{background:color-mix(in srgb, var(--mint) 22%, transparent);color:#4f8f78;border-color:transparent}
.mds-btn--done:hover:not(:disabled){background:color-mix(in srgb, var(--mint) 30%, transparent);color:#4f8f78}
.mds-btn--sm{font-size:var(--text-xs);padding:5px 12px}
.mds-btn--lg{font-size:var(--text-body-size);padding:9px 18px}
.mds-btn--block{width:100%}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-button-css")) {
  const el = document.createElement("style");
  el.id = "mds-button-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Mitlesen pill button. The chrome's primary control — always fully rounded.
 * `default` is the quiet ghost/secondary; `primary` is the periwinkle gradient
 * call-to-action; `done` is the mint "already read" confirmation state.
 */
export function Button({
  variant = "default",
  size = "md",
  block = false,
  icon = null,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "mds-btn",
    variant !== "default" ? `mds-btn--${variant}` : "",
    size !== "md" ? `mds-btn--${size}` : "",
    block ? "mds-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} {...rest}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </button>
  );
}
