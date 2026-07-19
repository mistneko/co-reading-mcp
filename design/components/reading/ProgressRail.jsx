import React from "react";

const CSS = `
.mds-prail{display:flex;align-items:center;gap:8px}
.mds-prail__track{flex:1;height:4px;border-radius:var(--radius-pill);background:var(--accent-soft);overflow:hidden}
.mds-prail__fill{height:100%;background:var(--grad-progress);border-radius:var(--radius-pill);transition:width var(--dur-slow)}
.mds-prail__label{font-size:var(--text-xs);color:var(--text-dim);font-variant-numeric:tabular-nums;white-space:nowrap}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-progressrail-css")) {
  const el = document.createElement("style");
  el.id = "mds-progressrail-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Thin reading-progress bar — a periwinkle gradient fill on a soft track.
 * Pass `read`/`total` to show a "3/12" label, or a raw `value` percentage.
 */
export function ProgressRail({ value, read, total, showLabel = false, className = "", ...rest }) {
  const pct =
    typeof value === "number"
      ? value
      : total
      ? Math.round(((read || 0) / total) * 100)
      : 0;
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className={["mds-prail", className].filter(Boolean).join(" ")} {...rest}>
      <div className="mds-prail__track" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className="mds-prail__fill" style={{ width: clamped + "%" }} />
      </div>
      {showLabel && total ? <span className="mds-prail__label">{read || 0}/{total}</span> : null}
    </div>
  );
}
