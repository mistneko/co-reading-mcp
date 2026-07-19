import React from "react";

const CSS = `
@keyframes mds-voice-enter{to{opacity:var(--o)}}
.mds-voice{display:block;width:100%;height:34px}
.mds-voice--first circle{fill:var(--voice-first)}
.mds-voice--second circle{fill:var(--voice-second);opacity:0;animation:mds-voice-enter .9s ease forwards}
@media (prefers-reduced-motion:reduce){.mds-voice--second circle{animation:none;opacity:var(--o)}}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-voicestaff-css")) {
  const el = document.createElement("style");
  el.id = "mds-voicestaff-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* Pachelbel canon bass contour — the pitch outline the letters are built on. */
const FIRST = [[20, 8], [90, 18], [160, 14], [230, 24], [300, 21], [370, 28], [440, 21], [510, 18]];
const SECOND = [
  [160, 8, 0.9, 0.2], [230, 18, 0.78, 0.5], [300, 14, 0.62, 0.8],
  [370, 24, 0.46, 1.1], [440, 21, 0.3, 1.4], [510, 28, 0.15, 1.7],
];

/**
 * 双声部 — the canon voice motif. A row of dots tracing the Pachelbel bass line.
 * The `first` voice (ice) leads; the `second` voice (gold) enters two beats late
 * and fades to 余韵 (reverberation) — the visual root of the name *Nachklang*.
 * Pair one at a page's head and one at its foot to frame content between voices.
 */
export function VoiceStaff({ voice = "first", animate = true, className = "", ...rest }) {
  const classes = ["mds-voice", `mds-voice--${voice}`, className].filter(Boolean).join(" ");
  return (
    <svg className={classes} viewBox="0 0 560 34" aria-hidden="true" {...rest}>
      {(voice === "second" ? SECOND : FIRST).map(([cx, cy, o, d], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3.4"
          style={voice === "second" ? { "--o": o, animationDelay: animate ? d + "s" : "0s", ...(animate ? {} : { opacity: o, animation: "none" }) } : undefined}
        />
      ))}
    </svg>
  );
}
