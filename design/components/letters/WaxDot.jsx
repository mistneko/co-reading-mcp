import React from "react";

const CSS = `
.mds-waxdot{display:inline-block;border-radius:50%;background:radial-gradient(circle at 35% 30%, rgba(255,255,255,.55) 0 16%, transparent 42%), var(--mds-dot, var(--mood-dot));box-shadow:0 1px 2px rgba(45,49,66,.25);vertical-align:middle;flex:none}
.mds-waxdot--hollow{background:transparent;box-shadow:none;border:1.5px solid var(--text-faint)}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-waxdot-css")) {
  const el = document.createElement("style");
  el.id = "mds-waxdot-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const TONES = {
  accent: "var(--accent)",
  deep: "var(--accent-deep)",
  rose: "var(--rose)",
  mint: "var(--mint)",
  gold: "var(--seal-gold)",
  lavender: "var(--lavender)",
  ice: "var(--vk-ice)",
};

/**
 * 蜡点 — a wax dot. The design language's single shape for *all* emotion /
 * status: a little radial-gradient bead like a drop of wax, never a colour bar
 * (信纸 axiom 3). Colour it by `tone` (or a raw `color`) to encode mood or
 * category; `hollow` reads as an empty / unread state.
 */
export function WaxDot({ tone = "accent", color, size = 10, hollow = false, className = "", style, ...rest }) {
  const c = color || TONES[tone] || TONES.accent;
  return (
    <span
      className={["mds-waxdot", hollow ? "mds-waxdot--hollow" : "", className].filter(Boolean).join(" ")}
      style={{ width: size, height: size, ["--mds-dot"]: c, ...style }}
      {...rest}
    />
  );
}
