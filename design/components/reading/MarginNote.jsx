import React from "react";
import { PersonaTag } from "./PersonaTag.jsx";
import { Badge } from "../core/Badge.jsx";

const CSS = `
.mds-note{position:relative;border-radius:var(--radius-sm);padding:12px 14px;border:1px solid var(--snow-edge);background:var(--snow);color:var(--snow-ink);font-family:var(--font-sans)}
.mds-note--human{background:var(--grad-paper);border-color:var(--border-hover);color:var(--vk-ink)}
.mds-note--active{box-shadow:0 3px 16px rgba(123,142,198,.12)}
.mds-note__q{font-family:var(--font-serif);font-style:italic;font-size:var(--text-sm);color:var(--text-dim);border-left:2px solid var(--accent-med);padding-left:8px;margin-bottom:6px}
.mds-note__b{font-size:14px;line-height:1.55;white-space:pre-wrap;word-break:break-word}
.mds-note__m{display:flex;align-items:center;gap:8px;margin-top:8px;font-size:var(--text-xs);color:var(--text-dim)}
.mds-note__link{margin-left:auto;border:none;background:transparent;color:var(--accent-deep);font-size:12px;cursor:pointer;font-family:inherit}
.mds-note__paw{position:absolute;right:9px;bottom:8px;width:20px;height:20px;transform:rotate(-11deg);opacity:.85;pointer-events:none}
.mds-note__reply{margin-top:9px;padding-left:11px;border-left:1px dashed var(--border-hover);display:flex;flex-direction:column;gap:9px}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-marginnote-css")) {
  const el = document.createElement("style");
  el.id = "mds-marginnote-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

function PawStamp() {
  return (
    <svg className="mds-note__paw" viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <filter id="mdsPawInk" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.35 1.06" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
      </defs>
      <g filter="url(#mdsPawInk)" fill="#B58A3C">
        <ellipse cx="20.5" cy="27.4" rx="9" ry="7.4" />
        <ellipse cx="10.8" cy="17" rx="3.1" ry="4.1" transform="rotate(-20 10.8 17)" />
        <ellipse cx="16.8" cy="11.3" rx="3.3" ry="4.6" />
        <ellipse cx="23.6" cy="11.3" rx="3.3" ry="4.6" />
        <ellipse cx="29.6" cy="17" rx="3.1" ry="4.1" transform="rotate(20 29.6 17)" />
      </g>
    </svg>
  );
}

/**
 * A margin annotation anchored to a passage. 小奏's notes are cool snow-blue
 * and signed with an inked paw stamp; 小烟's notes are warm letter-paper. Shows
 * the quoted passage, the note body, the author, an optional "未交" (unsubmitted)
 * badge, a reply link, and an optional reply thread.
 */
export function MarginNote({
  persona = "ai",
  personaName,
  quote,
  open = false,
  active = false,
  replyCount = 0,
  onReply,
  replies = null,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "mds-note",
    persona === "human" ? "mds-note--human" : "mds-note--ai",
    active ? "mds-note--active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} {...rest}>
      {quote ? <div className="mds-note__q">「{quote}」</div> : null}
      <div className="mds-note__b">{children}</div>
      <div className="mds-note__m">
        <PersonaTag persona={persona} name={personaName} />
        {open ? <Badge tone="gold">未交</Badge> : null}
        {onReply ? (
          <button type="button" className="mds-note__link" onClick={onReply}>
            回应{replyCount ? ` · ${replyCount}` : ""}
          </button>
        ) : null}
      </div>
      {replies ? <div className="mds-note__reply">{replies}</div> : null}
      {persona === "ai" ? <PawStamp /> : null}
    </div>
  );
}
