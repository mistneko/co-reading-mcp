import React from "react";

const CSS = `
@keyframes mds-spin{to{transform:rotate(360deg)}}
.mds-toast{display:inline-flex;align-items:center;gap:8px;background:var(--text);color:var(--bg);font-family:var(--font-sans);font-size:var(--text-sm);padding:9px 18px;border-radius:var(--radius-pill);box-shadow:var(--shadow-lg);max-width:88vw;text-align:center;line-height:1.35}
.mds-toast__spin{display:inline-block;width:13px;height:13px;border:2px solid var(--accent-soft);border-top-color:var(--accent);border-radius:50%;animation:mds-spin .7s linear infinite;flex:none}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-toast-css")) {
  const el = document.createElement("style");
  el.id = "mds-toast-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * A transient acknowledgement pill — dark ground, light text — for the gentle
 * confirmations the product speaks in ("批注留下了 ✎", "这章读完了 ✓"). Set
 * `loading` for a spinner during imports. Position it yourself (usually fixed,
 * top-centre).
 */
export function Toast({ loading = false, icon = null, className = "", children, ...rest }) {
  return (
    <div className={["mds-toast", className].filter(Boolean).join(" ")} role="status" {...rest}>
      {loading ? <span className="mds-toast__spin" aria-hidden="true" /> : icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </div>
  );
}
