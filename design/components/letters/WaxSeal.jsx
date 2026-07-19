import React from "react";

const CSS = `
@keyframes mds-seal-breath{0%,100%{filter:drop-shadow(0 1px 2px rgba(45,49,66,.18));transform:rotate(-7deg) scale(1)}50%{filter:drop-shadow(0 3px 7px rgba(45,49,66,.28));transform:rotate(-7deg) scale(1.04)}}
.mds-seal{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:var(--grad-seal);box-shadow:var(--shadow-seal);transform:rotate(-7deg);opacity:.95;flex:none;line-height:0}
.mds-seal--breathe{animation:mds-seal-breath 3.2s ease-in-out infinite}
.mds-seal--broken{opacity:.78}
.mds-seal svg{transform:rotate(4deg);display:block}
@media (prefers-reduced-motion:reduce){.mds-seal--breathe{animation:none}}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-waxseal-css")) {
  const el = document.createElement("style");
  el.id = "mds-waxseal-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const SIZES = { dot: 18, sm: 30, md: 40, lg: 54 };

/**
 * 火漆 — the wax seal. The brand's signature mark and the object every "open
 * the letter" ritual turns on. A gold radial-gradient wafer embossed with 小奏's
 * canon motif (a music note trailing into reverberation — the echo/余韵). Set
 * `breathe` for the gentle idle pulse used on an unopened letter.
 */
export function WaxSeal({ size = "md", breathe = false, broken = false, label = "wax seal", className = "", ...rest }) {
  const px = SIZES[size] || SIZES.md;
  const inner = Math.round(px * 0.58);
  const classes = ["mds-seal", breathe ? "mds-seal--breathe" : "", broken ? "mds-seal--broken" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={classes} style={{ width: px, height: px }} role="img" aria-label={label} {...rest}>
      <svg viewBox="0 0 40 40" width={inner} height={inner} aria-hidden="true">
        <g fill="#FBF7EE">
          <ellipse cx="14" cy="29" rx="5.2" ry="3.9" transform="rotate(-18 14 29)" />
          <rect x="18.1" y="10" width="2.3" height="19" rx="1.1" />
          <circle cx="24" cy="9.5" r="1.9" opacity=".95" />
          <circle cx="29" cy="7" r="1.6" opacity=".75" />
          <circle cx="33.5" cy="9" r="1.3" opacity=".55" />
          <circle cx="31" cy="12.5" r="1.1" opacity=".4" />
          <circle cx="36" cy="12" r=".9" opacity=".28" />
        </g>
      </svg>
    </span>
  );
}
