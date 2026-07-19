import React from "react";

const CSS = `
.mds-seg{display:inline-flex;gap:6px;flex-wrap:wrap}
.mds-seg-btn{flex:0 0 auto;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--text-mid);background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-pill);padding:6px 16px;cursor:pointer;transition:var(--dur-fast);line-height:1}
.mds-seg-btn:hover:not(.mds-seg-btn--on){border-color:var(--border-hover);color:var(--text)}
.mds-seg-btn--on{background:var(--accent-med);border-color:transparent;color:var(--accent-deep);font-weight:var(--weight-semibold)}
.mds-seg-btn .mds-seg-n{font-size:var(--text-xs);opacity:.7;margin-left:2px}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-segmented-css")) {
  const el = document.createElement("style");
  el.id = "mds-segmented-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * The vk-seg segmented pill control — the system's tab / sub-view switcher.
 * Each option is a quiet pill; the selected one fills with the accent tint.
 * Options may carry a small count.
 */
export function SegmentedControl({ options = [], value, onChange, className = "", ...rest }) {
  return (
    <div className={["mds-seg", className].filter(Boolean).join(" ")} role="tablist" {...rest}>
      {options.map((o) => {
        const opt = typeof o === "string" ? { value: o, label: o } : o;
        const on = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={on}
            className={"mds-seg-btn" + (on ? " mds-seg-btn--on" : "")}
            onClick={() => onChange && onChange(opt.value)}
          >
            {opt.label}
            {opt.count != null ? <span className="mds-seg-n">{opt.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
