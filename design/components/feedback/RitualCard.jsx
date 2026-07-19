import React from "react";

const CSS = `
.mds-ritual{position:relative;width:360px;max-width:100%;overflow:hidden;border-radius:var(--radius-card);padding:34px 32px 32px;background:linear-gradient(145deg,#fbf6ee,#eeeae2 58%,#e2e4dc);border:1px solid rgba(255,255,255,.86);box-shadow:0 18px 54px rgba(70,54,42,.13),inset 0 0 0 1px rgba(255,255,255,.42);color:#25221f;font-family:var(--font-sans)}
.mds-ritual--compact{min-height:560px}
.mds-ritual--standard{min-height:660px}
.mds-ritual--tall{min-height:760px}
.mds-ritual--ripple{background:linear-gradient(145deg,#faf5ed,#eee9df 58%,#e6e5dc)}
.mds-ritual--stardust{background:linear-gradient(145deg,#f8f5ef,#eeeae2 58%,#e8e6df)}
.mds-ritual--lastfold{background:linear-gradient(145deg,#faf7f0,#eeeae1 60%,#e7e8e0)}
.mds-ritual__art{position:absolute;inset:0;pointer-events:none;opacity:.68}
.mds-ritual--lastfold .mds-ritual__art{opacity:.78}
.mds-ritual__art svg{width:100%;height:100%;display:block}
.mds-ritual__content{position:relative;z-index:1;display:flex;flex-direction:column;gap:18px;min-height:590px}
.mds-ritual--compact .mds-ritual__content{min-height:490px}
.mds-ritual--tall .mds-ritual__content{min-height:690px}
.mds-ritual__name{margin:0;color:#a7a097;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
.mds-ritual__kicker{margin:0;color:#777168;font-size:15px;font-weight:800}
.mds-ritual__title{margin:0;font-size:34px;line-height:1.06;letter-spacing:0}
.mds-ritual__sub{margin:-8px 0 0;color:#868078;font-size:14px}
.mds-ritual__quote{margin:86px 0 0;padding:0;color:#34302b;font-family:var(--font-quote);font-size:27px;line-height:1.48}
.mds-ritual--lastfold .mds-ritual__quote{margin-top:72px}
.mds-ritual__note{margin-top:auto;border-top:1px solid rgba(40,36,31,.13);padding-top:12px;color:#4b463f;font-size:14px;line-height:1.55}
.mds-ritual__note b{display:block;margin-bottom:6px;color:#817b72;font-size:12px;text-transform:uppercase;font-weight:800}
.mds-ritual__foot{margin:0;color:#817b72;font-size:13px}
`;

if (typeof document !== "undefined" && !document.getElementById("mds-ritualcard-css")) {
  const el = document.createElement("style");
  el.id = "mds-ritualcard-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const LABELS = { fold: "FOLDED MARGIN", ripple: "ECHO BOOKMARK", stardust: "DUST TRACE", lastfold: "LAST FOLD" };

function seededRandom(seed) {
  let v = (Number(seed) || 1) >>> 0;
  return () => {
    v ^= v << 13;
    v ^= v >>> 17;
    v ^= v << 5;
    return (v >>> 0) / 4294967296;
  };
}
function hashText(value) {
  let h = 2166136261;
  for (const c of String(value || "")) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* Faithful port of the product's generative card art (src/card-renderer.js). */
function artMarkup(art, seed, w, h) {
  const r = seededRandom(seed);
  if (art === "lastfold") {
    const points = Array.from({ length: 18 }, () => Math.floor(r() * 3));
    const max = Math.max(...points, 1);
    const left = w * 0.15, right = w * 0.86, base = h * 0.34, amp = h * 0.09;
    const line = points
      .map((v, i) => {
        const x = left + (right - left) * (i / (points.length - 1));
        const y = base - (v / max) * amp + (r() - 0.5) * 5;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    const sx = w * (0.82 + r() * 0.05);
    const spine = `<path d="M ${sx.toFixed(1)} 34 C ${(sx - 8).toFixed(1)} ${(h * 0.36).toFixed(1)} ${(sx + 7).toFixed(1)} ${(h * 0.7).toFixed(1)} ${sx.toFixed(1)} ${(h - 34).toFixed(1)}" fill="none" stroke="#514a42" stroke-width="0.8" opacity="0.11"/>`;
    const quiet = Array.from({ length: 8 }, () => {
      const x = 44 + r() * (w - 88);
      return `<path d="M ${x.toFixed(1)} 40 L ${(x + (r() - 0.5) * 16).toFixed(1)} ${(h - 46).toFixed(1)}" fill="none" stroke="#514a42" stroke-width="0.55" opacity="${(0.035 + r() * 0.07).toFixed(3)}"/>`;
    }).join("");
    const wave = `<path d="${line}" fill="none" stroke="#6e665d" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" opacity="0.24"/>`;
    return `${quiet}${spine}<line x1="${(w * 0.13).toFixed(1)}" y1="${(h * 0.52).toFixed(1)}" x2="${(w * 0.87).toFixed(1)}" y2="${(h * 0.52).toFixed(1)}" stroke="#2b2722" stroke-width="0.7" opacity="0.10"/>${wave}`;
  }
  if (art === "ripple") {
    const centers = [
      [w * (0.24 + r() * 0.1), h * (0.2 + r() * 0.08)],
      [w * (0.56 + r() * 0.12), h * (0.42 + r() * 0.12)],
      [w * (0.2 + r() * 0.08), h * (0.68 + r() * 0.08)],
    ];
    return centers
      .flatMap(([cx, cy], g) =>
        Array.from({ length: g === 1 ? 4 : 3 }, (_, i) => {
          const rad = 34 + i * (30 + r() * 16) + r() * 10;
          const o = 0.035 + r() * 0.055;
          return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(1)}" fill="none" stroke="#665648" stroke-width="1.2" opacity="${o.toFixed(3)}"/>`;
        })
      )
      .join("");
  }
  if (art === "stardust") {
    const dots = Array.from({ length: 72 }, () => {
      const cx = 28 + r() * (w - 56), cy = 38 + r() * (h - 90), rad = 0.35 + r() * 0.95, o = 0.16 + r() * 0.38;
      return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(2)}" fill="#584e40" opacity="${o.toFixed(3)}"/>`;
    }).join("");
    const cross = Array.from({ length: 7 }, () => {
      const cx = 48 + r() * (w - 96), cy = 58 + r() * (h - 116), o = 0.18 + r() * 0.22;
      return `<path d="M ${(cx - 3).toFixed(1)} ${cy.toFixed(1)} L ${(cx + 3).toFixed(1)} ${cy.toFixed(1)} M ${cx.toFixed(1)} ${(cy - 3).toFixed(1)} L ${cx.toFixed(1)} ${(cy + 3).toFixed(1)}" stroke="#584e40" stroke-width="0.7" opacity="${o.toFixed(3)}"/>`;
    }).join("");
    return `${dots}${cross}`;
  }
  return Array.from({ length: 16 }, () => {
    const x = 34 + r() * (w - 68), drift = (r() - 0.5) * 34, o = 0.045 + r() * 0.1;
    return `<path d="M ${x.toFixed(1)} 18 C ${(x + drift).toFixed(1)} ${(h * 0.32).toFixed(1)} ${(x - drift).toFixed(1)} ${(h * 0.68).toFixed(1)} ${x.toFixed(1)} ${(h - 18).toFixed(1)}" fill="none" stroke="#4c453d" stroke-width="0.9" opacity="${o.toFixed(3)}"/>`;
  }).join("");
}

/**
 * A keepsake "ritual card" — the small paper bookmark the reader mints for a
 * shared margin, a resonant note, or a finished book. Four art moods (fold,
 * ripple, stardust, lastfold) each carry faint generative line-art on warm
 * printed paper. The art is deterministic per `seed`.
 */
export function RitualCard({
  art = "fold",
  size = "standard",
  name,
  kicker = "收获了一枚回声书签",
  title,
  subtitle,
  quote,
  note,
  footer = "a quiet mark left on the page",
  seed,
  className = "",
  children,
  ...rest
}) {
  const s = seed != null ? (typeof seed === "number" ? seed : hashText(seed)) : hashText(`${title}:${quote}:${note}`);
  const markup = artMarkup(art, s, 360, 760);
  const classes = ["mds-ritual", `mds-ritual--${art}`, `mds-ritual--${size}`, className].filter(Boolean).join(" ");
  return (
    <article className={classes} {...rest}>
      <div className="mds-ritual__art">
        <svg viewBox="0 0 360 760" preserveAspectRatio="none" dangerouslySetInnerHTML={{ __html: markup }} />
      </div>
      <div className="mds-ritual__content">
        <p className="mds-ritual__name">{name || LABELS[art] || "MARGIN"}</p>
        {kicker ? <p className="mds-ritual__kicker">{kicker}</p> : null}
        {title ? <h3 className="mds-ritual__title">{title}</h3> : null}
        {subtitle ? <p className="mds-ritual__sub">{subtitle}</p> : null}
        {quote ? <blockquote className="mds-ritual__quote">{quote}</blockquote> : null}
        <div className="mds-ritual__note">
          <b>margin</b>
          {note || children}
        </div>
        {footer ? <p className="mds-ritual__foot">{footer}</p> : null}
      </div>
    </article>
  );
}
