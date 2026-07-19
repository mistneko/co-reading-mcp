/* @ds-bundle: {"format":4,"namespace":"MitlesenDesignSystem_737635","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"RitualCard","sourcePath":"components/feedback/RitualCard.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"VoiceStaff","sourcePath":"components/letters/VoiceStaff.jsx"},{"name":"WaxDot","sourcePath":"components/letters/WaxDot.jsx"},{"name":"WaxSeal","sourcePath":"components/letters/WaxSeal.jsx"},{"name":"BookCard","sourcePath":"components/reading/BookCard.jsx"},{"name":"ChapterRow","sourcePath":"components/reading/ChapterRow.jsx"},{"name":"Highlight","sourcePath":"components/reading/Highlight.jsx"},{"name":"MarginNote","sourcePath":"components/reading/MarginNote.jsx"},{"name":"PersonaTag","sourcePath":"components/reading/PersonaTag.jsx"},{"name":"ProgressRail","sourcePath":"components/reading/ProgressRail.jsx"},{"name":"Sheet","sourcePath":"components/reading/Sheet.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"1ef3ae222e71","components/core/Button.jsx":"7336bd942d38","components/core/Eyebrow.jsx":"3722eef5b873","components/core/IconButton.jsx":"ef7578695375","components/core/SegmentedControl.jsx":"86f4d3274552","components/feedback/EmptyState.jsx":"2aaf11242c64","components/feedback/RitualCard.jsx":"e01b52d0791a","components/feedback/Toast.jsx":"853e4396ba83","components/letters/VoiceStaff.jsx":"c71ac3570b03","components/letters/WaxDot.jsx":"1a2088c067cd","components/letters/WaxSeal.jsx":"b4ebb6082f57","components/reading/BookCard.jsx":"273662598165","components/reading/ChapterRow.jsx":"e80014e053e3","components/reading/Highlight.jsx":"8fd526f5c26f","components/reading/MarginNote.jsx":"ac09c27ff07a","components/reading/PersonaTag.jsx":"2993128641d2","components/reading/ProgressRail.jsx":"331c693e945f","components/reading/Sheet.jsx":"f2c3b6140d05","ui_kits/mitlesen-mobile/mobile-app.jsx":"2c36e06b0d78","ui_kits/mitlesen-reader/data.js":"2b5c967d4024","ui_kits/mitlesen-reader/reader-app.jsx":"b691ed7f2e9d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MitlesenDesignSystem_737635 = window.MitlesenDesignSystem_737635 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mds-badge{display:inline-flex;align-items:center;gap:3px;font-family:var(--font-sans);font-size:var(--text-2xs);line-height:1.4;white-space:nowrap;vertical-align:middle}
.mds-badge--accent{color:var(--accent-deep);background:var(--accent-soft);border-radius:var(--radius-pill);padding:1px 6px}
.mds-badge--gold{color:var(--vk-ink-dim);background:rgba(201,168,106,.16);border-radius:var(--radius-pill);padding:1px 7px}
.mds-badge--rose{color:var(--rose);background:var(--rose-soft);border-radius:var(--radius-pill);padding:1px 7px}
.mds-badge--plain{color:var(--accent-deep);font-size:var(--text-xs)}
`;
if (typeof document !== "undefined" && !document.getElementById("mds-badge-css")) {
  const el = document.createElement("style");
  el.id = "mds-badge-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Tiny status pill / count marker. `gold` marks an unsubmitted note ("未交"),
 * `accent` a periwinkle annotation count, `rose` a human-side marker, `plain`
 * a bare coloured count with no pill.
 */
function Badge({
  tone = "accent",
  className = "",
  children,
  ...rest
}) {
  const classes = ["mds-badge", `mds-badge--${tone}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
  variant = "default",
  size = "md",
  block = false,
  icon = null,
  className = "",
  children,
  ...rest
}) {
  const classes = ["mds-btn", variant !== "default" ? `mds-btn--${variant}` : "", size !== "md" ? `mds-btn--${size}` : "", block ? "mds-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: classes
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mds-eyebrow{display:block;font-family:var(--font-sans);font-size:var(--text-xs);font-weight:var(--weight-regular);letter-spacing:var(--tracking-eyebrow);text-transform:uppercase;color:var(--text-faint);margin:0}
`;
if (typeof document !== "undefined" && !document.getElementById("mds-eyebrow-css")) {
  const el = document.createElement("style");
  el.id = "mds-eyebrow-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Small uppercase, letter-spaced kicker that sits above a heading (书架,
 * 页边批注, section labels). The system's quietest label voice.
 */
function Eyebrow({
  as: Tag = "span",
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: ["mds-eyebrow", className].filter(Boolean).join(" ")
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mds-iconbtn{width:36px;height:36px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg2);color:var(--text-mid);font-size:16px;display:inline-flex;align-items:center;justify-content:center;flex:none;transition:var(--dur-fast);cursor:pointer;padding:0;font-family:var(--font-sans);line-height:1}
.mds-iconbtn:hover:not(:disabled){background:var(--accent-soft);color:var(--accent-deep);border-color:var(--border-hover)}
.mds-iconbtn:disabled{opacity:.4;cursor:default}
.mds-iconbtn--sm{width:30px;height:30px;font-size:14px}
.mds-iconbtn--bare{border-color:transparent;background:transparent}
.mds-iconbtn--bare:hover:not(:disabled){background:var(--accent-soft)}
`;
if (typeof document !== "undefined" && !document.getElementById("mds-iconbutton-css")) {
  const el = document.createElement("style");
  el.id = "mds-iconbutton-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * Rounded-square icon button holding a single Unicode glyph (☰ ↻ ＋ ◐ ✕).
 * The soft-cornered counterpart to the fully-round {@link Button}; used for
 * top-bar and rail controls.
 */
function IconButton({
  size = "md",
  bare = false,
  label,
  className = "",
  children,
  ...rest
}) {
  const classes = ["mds-iconbtn", size !== "md" ? `mds-iconbtn--${size}` : "", bare ? "mds-iconbtn--bare" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: classes,
    "aria-label": label,
    title: label
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function SegmentedControl({
  options = [],
  value,
  onChange,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["mds-seg", className].filter(Boolean).join(" "),
    role: "tablist"
  }, rest), options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    const on = opt.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      role: "tab",
      "aria-selected": on,
      className: "mds-seg-btn" + (on ? " mds-seg-btn--on" : ""),
      onClick: () => onChange && onChange(opt.value)
    }, opt.label, opt.count != null ? /*#__PURE__*/React.createElement("span", {
      className: "mds-seg-n"
    }, opt.count) : null);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mds-empty{margin:auto;text-align:center;color:var(--text-dim);font-family:var(--font-serif);font-style:italic;font-size:var(--text-lg);line-height:1.5;padding:40px}
.mds-empty__seal{font-size:34px;margin-bottom:12px;opacity:.5;font-style:normal}
`;
if (typeof document !== "undefined" && !document.getElementById("mds-empty-css")) {
  const el = document.createElement("style");
  el.id = "mds-empty-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * A quiet, serif-italic empty state topped by a large seal glyph. Used for the
 * empty shelf and the "pick a book" reading placeholder.
 */
function EmptyState({
  seal = "✒",
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["mds-empty", className].filter(Boolean).join(" ")
  }, rest), seal ? /*#__PURE__*/React.createElement("div", {
    className: "mds-empty__seal",
    "aria-hidden": "true"
  }, seal) : null, /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/RitualCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const LABELS = {
  fold: "FOLDED MARGIN",
  ripple: "ECHO BOOKMARK",
  stardust: "DUST TRACE",
  lastfold: "LAST FOLD"
};
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
    const points = Array.from({
      length: 18
    }, () => Math.floor(r() * 3));
    const max = Math.max(...points, 1);
    const left = w * 0.15,
      right = w * 0.86,
      base = h * 0.34,
      amp = h * 0.09;
    const line = points.map((v, i) => {
      const x = left + (right - left) * (i / (points.length - 1));
      const y = base - v / max * amp + (r() - 0.5) * 5;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
    const sx = w * (0.82 + r() * 0.05);
    const spine = `<path d="M ${sx.toFixed(1)} 34 C ${(sx - 8).toFixed(1)} ${(h * 0.36).toFixed(1)} ${(sx + 7).toFixed(1)} ${(h * 0.7).toFixed(1)} ${sx.toFixed(1)} ${(h - 34).toFixed(1)}" fill="none" stroke="#514a42" stroke-width="0.8" opacity="0.11"/>`;
    const quiet = Array.from({
      length: 8
    }, () => {
      const x = 44 + r() * (w - 88);
      return `<path d="M ${x.toFixed(1)} 40 L ${(x + (r() - 0.5) * 16).toFixed(1)} ${(h - 46).toFixed(1)}" fill="none" stroke="#514a42" stroke-width="0.55" opacity="${(0.035 + r() * 0.07).toFixed(3)}"/>`;
    }).join("");
    const wave = `<path d="${line}" fill="none" stroke="#6e665d" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" opacity="0.24"/>`;
    return `${quiet}${spine}<line x1="${(w * 0.13).toFixed(1)}" y1="${(h * 0.52).toFixed(1)}" x2="${(w * 0.87).toFixed(1)}" y2="${(h * 0.52).toFixed(1)}" stroke="#2b2722" stroke-width="0.7" opacity="0.10"/>${wave}`;
  }
  if (art === "ripple") {
    const centers = [[w * (0.24 + r() * 0.1), h * (0.2 + r() * 0.08)], [w * (0.56 + r() * 0.12), h * (0.42 + r() * 0.12)], [w * (0.2 + r() * 0.08), h * (0.68 + r() * 0.08)]];
    return centers.flatMap(([cx, cy], g) => Array.from({
      length: g === 1 ? 4 : 3
    }, (_, i) => {
      const rad = 34 + i * (30 + r() * 16) + r() * 10;
      const o = 0.035 + r() * 0.055;
      return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(1)}" fill="none" stroke="#665648" stroke-width="1.2" opacity="${o.toFixed(3)}"/>`;
    })).join("");
  }
  if (art === "stardust") {
    const dots = Array.from({
      length: 72
    }, () => {
      const cx = 28 + r() * (w - 56),
        cy = 38 + r() * (h - 90),
        rad = 0.35 + r() * 0.95,
        o = 0.16 + r() * 0.38;
      return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(2)}" fill="#584e40" opacity="${o.toFixed(3)}"/>`;
    }).join("");
    const cross = Array.from({
      length: 7
    }, () => {
      const cx = 48 + r() * (w - 96),
        cy = 58 + r() * (h - 116),
        o = 0.18 + r() * 0.22;
      return `<path d="M ${(cx - 3).toFixed(1)} ${cy.toFixed(1)} L ${(cx + 3).toFixed(1)} ${cy.toFixed(1)} M ${cx.toFixed(1)} ${(cy - 3).toFixed(1)} L ${cx.toFixed(1)} ${(cy + 3).toFixed(1)}" stroke="#584e40" stroke-width="0.7" opacity="${o.toFixed(3)}"/>`;
    }).join("");
    return `${dots}${cross}`;
  }
  return Array.from({
    length: 16
  }, () => {
    const x = 34 + r() * (w - 68),
      drift = (r() - 0.5) * 34,
      o = 0.045 + r() * 0.1;
    return `<path d="M ${x.toFixed(1)} 18 C ${(x + drift).toFixed(1)} ${(h * 0.32).toFixed(1)} ${(x - drift).toFixed(1)} ${(h * 0.68).toFixed(1)} ${x.toFixed(1)} ${(h - 18).toFixed(1)}" fill="none" stroke="#4c453d" stroke-width="0.9" opacity="${o.toFixed(3)}"/>`;
  }).join("");
}

/**
 * A keepsake "ritual card" — the small paper bookmark the reader mints for a
 * shared margin, a resonant note, or a finished book. Four art moods (fold,
 * ripple, stardust, lastfold) each carry faint generative line-art on warm
 * printed paper. The art is deterministic per `seed`.
 */
function RitualCard({
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
  const s = seed != null ? typeof seed === "number" ? seed : hashText(seed) : hashText(`${title}:${quote}:${note}`);
  const markup = artMarkup(art, s, 360, 760);
  const classes = ["mds-ritual", `mds-ritual--${art}`, `mds-ritual--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("article", _extends({
    className: classes
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mds-ritual__art"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 360 760",
    preserveAspectRatio: "none",
    dangerouslySetInnerHTML: {
      __html: markup
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mds-ritual__content"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mds-ritual__name"
  }, name || LABELS[art] || "MARGIN"), kicker ? /*#__PURE__*/React.createElement("p", {
    className: "mds-ritual__kicker"
  }, kicker) : null, title ? /*#__PURE__*/React.createElement("h3", {
    className: "mds-ritual__title"
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "mds-ritual__sub"
  }, subtitle) : null, quote ? /*#__PURE__*/React.createElement("blockquote", {
    className: "mds-ritual__quote"
  }, quote) : null, /*#__PURE__*/React.createElement("div", {
    className: "mds-ritual__note"
  }, /*#__PURE__*/React.createElement("b", null, "margin"), note || children), footer ? /*#__PURE__*/React.createElement("p", {
    className: "mds-ritual__foot"
  }, footer) : null));
}
Object.assign(__ds_scope, { RitualCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/RitualCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Toast({
  loading = false,
  icon = null,
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["mds-toast", className].filter(Boolean).join(" "),
    role: "status"
  }, rest), loading ? /*#__PURE__*/React.createElement("span", {
    className: "mds-toast__spin",
    "aria-hidden": "true"
  }) : icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, icon) : null, /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/letters/VoiceStaff.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const SECOND = [[160, 8, 0.9, 0.2], [230, 18, 0.78, 0.5], [300, 14, 0.62, 0.8], [370, 24, 0.46, 1.1], [440, 21, 0.3, 1.4], [510, 28, 0.15, 1.7]];

/**
 * 双声部 — the canon voice motif. A row of dots tracing the Pachelbel bass line.
 * The `first` voice (ice) leads; the `second` voice (gold) enters two beats late
 * and fades to 余韵 (reverberation) — the visual root of the name *Nachklang*.
 * Pair one at a page's head and one at its foot to frame content between voices.
 */
function VoiceStaff({
  voice = "first",
  animate = true,
  className = "",
  ...rest
}) {
  const classes = ["mds-voice", `mds-voice--${voice}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: classes,
    viewBox: "0 0 560 34",
    "aria-hidden": "true"
  }, rest), (voice === "second" ? SECOND : FIRST).map(([cx, cy, o, d], i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: cx,
    cy: cy,
    r: "3.4",
    style: voice === "second" ? {
      "--o": o,
      animationDelay: animate ? d + "s" : "0s",
      ...(animate ? {} : {
        opacity: o,
        animation: "none"
      })
    } : undefined
  })));
}
Object.assign(__ds_scope, { VoiceStaff });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/letters/VoiceStaff.jsx", error: String((e && e.message) || e) }); }

// components/letters/WaxDot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  ice: "var(--vk-ice)"
};

/**
 * 蜡点 — a wax dot. The design language's single shape for *all* emotion /
 * status: a little radial-gradient bead like a drop of wax, never a colour bar
 * (信纸 axiom 3). Colour it by `tone` (or a raw `color`) to encode mood or
 * category; `hollow` reads as an empty / unread state.
 */
function WaxDot({
  tone = "accent",
  color,
  size = 10,
  hollow = false,
  className = "",
  style,
  ...rest
}) {
  const c = color || TONES[tone] || TONES.accent;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["mds-waxdot", hollow ? "mds-waxdot--hollow" : "", className].filter(Boolean).join(" "),
    style: {
      width: size,
      height: size,
      ["--mds-dot"]: c,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { WaxDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/letters/WaxDot.jsx", error: String((e && e.message) || e) }); }

// components/letters/WaxSeal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const SIZES = {
  dot: 18,
  sm: 30,
  md: 40,
  lg: 54
};

/**
 * 火漆 — the wax seal. The brand's signature mark and the object every "open
 * the letter" ritual turns on. A gold radial-gradient wafer embossed with 小奏's
 * canon motif (a music note trailing into reverberation — the echo/余韵). Set
 * `breathe` for the gentle idle pulse used on an unopened letter.
 */
function WaxSeal({
  size = "md",
  breathe = false,
  broken = false,
  label = "wax seal",
  className = "",
  ...rest
}) {
  const px = SIZES[size] || SIZES.md;
  const inner = Math.round(px * 0.58);
  const classes = ["mds-seal", breathe ? "mds-seal--breathe" : "", broken ? "mds-seal--broken" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes,
    style: {
      width: px,
      height: px
    },
    role: "img",
    "aria-label": label
  }, rest), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 40 40",
    width: inner,
    height: inner,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    fill: "#FBF7EE"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "14",
    cy: "29",
    rx: "5.2",
    ry: "3.9",
    transform: "rotate(-18 14 29)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "18.1",
    y: "10",
    width: "2.3",
    height: "19",
    rx: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "9.5",
    r: "1.9",
    opacity: ".95"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "29",
    cy: "7",
    r: "1.6",
    opacity: ".75"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "33.5",
    cy: "9",
    r: "1.3",
    opacity: ".55"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "31",
    cy: "12.5",
    r: "1.1",
    opacity: ".4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "12",
    r: ".9",
    opacity: ".28"
  }))));
}
Object.assign(__ds_scope, { WaxSeal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/letters/WaxSeal.jsx", error: String((e && e.message) || e) }); }

// components/reading/ChapterRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mds-chap{display:flex;align-items:center;gap:8px;padding:7px 9px;border-radius:8px;cursor:pointer;color:var(--text-mid);font-family:var(--font-sans);font-size:var(--text-sm);transition:var(--dur-fast);border:0;background:transparent;width:100%;text-align:left}
.mds-chap:hover{background:var(--accent-soft);color:var(--text)}
.mds-chap--current{background:var(--accent-med);color:var(--accent-deep);font-weight:var(--weight-semibold)}
.mds-chap__dot{width:9px;height:9px;border-radius:50%;flex:none;border:1.5px solid var(--text-faint);background:transparent}
.mds-chap--read .mds-chap__dot{border:none;background:radial-gradient(circle at 35% 30%, rgba(255,255,255,.5) 0 18%, transparent 40%), var(--mint);box-shadow:0 1px 2px rgba(45,49,66,.25)}
.mds-chap__name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mds-chap__ann{font-size:var(--text-2xs);color:var(--accent-deep);background:var(--accent-soft);border-radius:var(--radius-pill);padding:1px 6px}
`;
if (typeof document !== "undefined" && !document.getElementById("mds-chapterrow-css")) {
  const el = document.createElement("style");
  el.id = "mds-chapterrow-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * One row in the table-of-contents accordion. A status dot shows read (filled
 * mint), unread (hollow ring), and `current` (highlighted row). Optional
 * annotation count on the right.
 */
function ChapterRow({
  title,
  read = false,
  current = false,
  annotationCount = 0,
  className = "",
  ...rest
}) {
  const classes = ["mds-chap", read ? "mds-chap--read" : "", current ? "mds-chap--current" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: classes
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "mds-chap__dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mds-chap__name"
  }, title), annotationCount ? /*#__PURE__*/React.createElement("span", {
    className: "mds-chap__ann"
  }, annotationCount) : null);
}
Object.assign(__ds_scope, { ChapterRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reading/ChapterRow.jsx", error: String((e && e.message) || e) }); }

// components/reading/Highlight.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mds-mark{color:inherit;cursor:pointer;border-radius:1px;padding:0 1px;transition:background var(--dur-fast);background:var(--mark-human)}
.mds-mark--ai{background:var(--mark-ai)}
.mds-mark--active{background:var(--mark-active)}
`;
if (typeof document !== "undefined" && !document.getElementById("mds-highlight-css")) {
  const el = document.createElement("style");
  el.id = "mds-highlight-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * An inline passage highlight — an *underline wash* (ink on the bottom ~42% of
 * the line), gold for the human, ice-blue for 小奏. Use inside a {@link Sheet}.
 */
function Highlight({
  by = "human",
  active = false,
  className = "",
  children,
  ...rest
}) {
  const classes = ["mds-mark", by === "ai" ? "mds-mark--ai" : "", active ? "mds-mark--active" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("mark", _extends({
    className: classes
  }, rest), children);
}
Object.assign(__ds_scope, { Highlight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reading/Highlight.jsx", error: String((e && e.message) || e) }); }

// components/reading/PersonaTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function PersonaTag({
  persona = "ai",
  name,
  className = "",
  ...rest
}) {
  const label = name || (persona === "human" ? "小烟" : "小奏");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["mds-persona", `mds-persona--${persona}`, className].filter(Boolean).join(" ")
  }, rest), label);
}
Object.assign(__ds_scope, { PersonaTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reading/PersonaTag.jsx", error: String((e && e.message) || e) }); }

// components/reading/MarginNote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return /*#__PURE__*/React.createElement("svg", {
    className: "mds-note__paw",
    viewBox: "0 0 40 40",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "mdsPawInk",
    x: "-25%",
    y: "-25%",
    width: "150%",
    height: "150%"
  }, /*#__PURE__*/React.createElement("feTurbulence", {
    type: "fractalNoise",
    baseFrequency: "0.6",
    numOctaves: "2",
    seed: "7",
    result: "n"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "n",
    type: "matrix",
    values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.35 1.06",
    result: "m"
  }), /*#__PURE__*/React.createElement("feComposite", {
    in: "SourceGraphic",
    in2: "m",
    operator: "in"
  }))), /*#__PURE__*/React.createElement("g", {
    filter: "url(#mdsPawInk)",
    fill: "#B58A3C"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "20.5",
    cy: "27.4",
    rx: "9",
    ry: "7.4"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "10.8",
    cy: "17",
    rx: "3.1",
    ry: "4.1",
    transform: "rotate(-20 10.8 17)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "16.8",
    cy: "11.3",
    rx: "3.3",
    ry: "4.6"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "23.6",
    cy: "11.3",
    rx: "3.3",
    ry: "4.6"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "29.6",
    cy: "17",
    rx: "3.1",
    ry: "4.1",
    transform: "rotate(20 29.6 17)"
  })));
}

/**
 * A margin annotation anchored to a passage. 小奏's notes are cool snow-blue
 * and signed with an inked paw stamp; 小烟's notes are warm letter-paper. Shows
 * the quoted passage, the note body, the author, an optional "未交" (unsubmitted)
 * badge, a reply link, and an optional reply thread.
 */
function MarginNote({
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
  const classes = ["mds-note", persona === "human" ? "mds-note--human" : "mds-note--ai", active ? "mds-note--active" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, rest), quote ? /*#__PURE__*/React.createElement("div", {
    className: "mds-note__q"
  }, "\u300C", quote, "\u300D") : null, /*#__PURE__*/React.createElement("div", {
    className: "mds-note__b"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "mds-note__m"
  }, /*#__PURE__*/React.createElement(__ds_scope.PersonaTag, {
    persona: persona,
    name: personaName
  }), open ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "gold"
  }, "\u672A\u4EA4") : null, onReply ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mds-note__link",
    onClick: onReply
  }, "\u56DE\u5E94", replyCount ? ` · ${replyCount}` : "") : null), replies ? /*#__PURE__*/React.createElement("div", {
    className: "mds-note__reply"
  }, replies) : null, persona === "ai" ? /*#__PURE__*/React.createElement(PawStamp, null) : null);
}
Object.assign(__ds_scope, { MarginNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reading/MarginNote.jsx", error: String((e && e.message) || e) }); }

// components/reading/ProgressRail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function ProgressRail({
  value,
  read,
  total,
  showLabel = false,
  className = "",
  ...rest
}) {
  const pct = typeof value === "number" ? value : total ? Math.round((read || 0) / total * 100) : 0;
  const clamped = Math.max(0, Math.min(100, pct));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["mds-prail", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mds-prail__track",
    role: "progressbar",
    "aria-valuenow": clamped,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "mds-prail__fill",
    style: {
      width: clamped + "%"
    }
  })), showLabel && total ? /*#__PURE__*/React.createElement("span", {
    className: "mds-prail__label"
  }, read || 0, "/", total) : null);
}
Object.assign(__ds_scope, { ProgressRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reading/ProgressRail.jsx", error: String((e && e.message) || e) }); }

// components/reading/BookCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mds-book{position:relative;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px 13px;cursor:pointer;transition:var(--dur);box-shadow:var(--shadow-sm);text-align:left;width:100%;font-family:var(--font-sans);color:inherit}
.mds-book:hover{border-color:var(--border-hover)}
.mds-book--active{border-color:var(--accent-med);background:var(--surface-hover);box-shadow:var(--shadow-book-active)}
.mds-book__title{font-family:var(--font-serif);font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:var(--leading-snug);color:var(--text)}
.mds-book__sub{font-size:12px;color:var(--text-dim);margin-top:2px;font-style:italic;font-family:var(--font-serif)}
.mds-book__meta{display:flex;align-items:center;gap:8px;margin-top:9px}
.mds-book__ann{font-size:var(--text-xs);color:var(--accent-deep);white-space:nowrap}
.mds-book__del{position:absolute;top:8px;right:8px;width:22px;height:22px;border:none;background:transparent;color:var(--text-faint);border-radius:var(--radius-xs);font-size:var(--text-sm);display:none;align-items:center;justify-content:center;cursor:pointer}
.mds-book:hover .mds-book__del{display:inline-flex}
.mds-book__del:hover{background:var(--rose-soft);color:var(--rose)}
`;
if (typeof document !== "undefined" && !document.getElementById("mds-bookcard-css")) {
  const el = document.createElement("style");
  el.id = "mds-bookcard-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * A book on the shelf: serif title, italic author, a progress rail with a
 * read/total count and an optional annotation tally. Hovering reveals a quiet
 * delete affordance when `onDelete` is provided.
 */
function BookCard({
  title,
  author,
  read = 0,
  total = 0,
  annotationCount = 0,
  active = false,
  onDelete,
  className = "",
  ...rest
}) {
  const classes = ["mds-book", active ? "mds-book--active" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes,
    role: "button",
    tabIndex: 0
  }, rest), onDelete ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mds-book__del",
    "aria-label": "\u79FB\u9664",
    title: "\u79FB\u9664",
    onClick: e => {
      e.stopPropagation();
      onDelete(e);
    }
  }, "\uD83D\uDDD1") : null, /*#__PURE__*/React.createElement("div", {
    className: "mds-book__title"
  }, title), author ? /*#__PURE__*/React.createElement("div", {
    className: "mds-book__sub"
  }, author) : null, /*#__PURE__*/React.createElement("div", {
    className: "mds-book__meta"
  }, /*#__PURE__*/React.createElement(__ds_scope.ProgressRail, {
    read: read,
    total: total,
    showLabel: true
  }), annotationCount ? /*#__PURE__*/React.createElement("span", {
    className: "mds-book__ann"
  }, "\u270E", annotationCount) : null));
}
Object.assign(__ds_scope, { BookCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reading/BookCard.jsx", error: String((e && e.message) || e) }); }

// components/reading/Sheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mds-sheet{position:relative;background:var(--grad-paper);border:1px solid var(--border);border-radius:var(--radius-sheet);padding:34px 30px 30px 46px;box-shadow:var(--shadow-sheet)}
.mds-sheet::before{content:'';position:absolute;left:30px;top:20px;bottom:20px;width:1px;background:rgba(176,110,90,.28)}
.mds-sheet__text{font-family:var(--font-serif);font-size:var(--reading-size);line-height:var(--reading-leading);color:var(--vk-ink);white-space:pre-wrap;word-break:break-word;background:var(--texture-rule);background-position:0 25px}
.mds-sheet--plain .mds-sheet__text{background:none}
`;
if (typeof document !== "undefined" && !document.getElementById("mds-sheet-css")) {
  const el = document.createElement("style");
  el.id = "mds-sheet-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * The letter-paper reading surface (信纸): warm ivory gradient, a vertical
 * binding line down the left margin, and faint horizontal rules the text sits
 * on. Put chunk text — with inline {@link Highlight} marks — inside.
 */
function Sheet({
  ruled = true,
  className = "",
  children,
  ...rest
}) {
  const classes = ["mds-sheet", ruled ? "" : "mds-sheet--plain", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("article", _extends({
    className: classes
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mds-sheet__text"
  }, children));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/reading/Sheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mitlesen-mobile/mobile-app.jsx
try { (() => {
/* 共读 · Mitlesen — mobile PWA redesign. Immersive, bottom-tab, composes the
   design-system components (window.MitlesenDesignSystem_737635). */
(function () {
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const DS = window.MitlesenDesignSystem_737635;
  const {
    Button,
    ChapterRow,
    Highlight,
    MarginNote,
    WaxDot,
    VoiceStaff,
    RitualCard,
    EmptyState
  } = DS;
  const DATA = window.MitlesenData;
  const HUMAN = new Set(["user", "human", "koshi", "you", "小烟", "祁烟"]);
  const isHuman = a => HUMAN.has(String(a || "").toLowerCase()) || HUMAN.has(a);
  const COVER = {
    "anthropic-guidelines": "linear-gradient(150deg,#7B8EC6,#5E6FA8)",
    "night-passage": "linear-gradient(150deg,#8A8270,#4A4438)"
  };
  const PAPER = {
    warm: {
      background: "linear-gradient(180deg,#FBF8F1,#F3EEE2)",
      "--vk-paper": "#FBF8F1",
      "--vk-paper2": "#F3EEE2",
      "--vk-ink": "#4A4438",
      "--vk-ink-dim": "#8A8270",
      "--vk-rule": "#E7DFC9"
    },
    snow: {
      background: "linear-gradient(180deg,#F7F9FC,#EEF2F8)",
      "--vk-paper": "#F7F9FC",
      "--vk-paper2": "#EEF2F8",
      "--vk-ink": "#3A4453",
      "--vk-ink-dim": "#6B7889",
      "--vk-rule": "#DBE4EE"
    },
    night: {
      background: "linear-gradient(180deg,#23212C,#1D1B25)",
      "--vk-paper": "#23212C",
      "--vk-paper2": "#1D1B25",
      "--vk-ink": "#E6E1D6",
      "--vk-ink-dim": "#9A9384",
      "--vk-rule": "#37333F"
    }
  };
  function Ring({
    pct,
    size = 30
  }) {
    const r = (size - 4) / 2,
      c = 2 * Math.PI * r,
      off = c * (1 - pct / 100);
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      style: {
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: "var(--accent-soft)",
      strokeWidth: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: "var(--accent)",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeDasharray: c,
      strokeDashoffset: off,
      transform: `rotate(-90 ${size / 2} ${size / 2})`
    }));
  }

  /* 阅读山脉 — a reading-activity mountain range (echoes the ritual card's density wave). */
  function Mountains({
    data
  }) {
    const w = 300,
      h = 92,
      max = Math.max(...data, 1),
      step = w / (data.length - 1);
    const pts = data.map((v, i) => [i * step, h - 10 - v / max * (h - 28)]);
    const line = "M " + pts.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" L ");
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${w} ${h}`,
      width: "100%",
      height: "92",
      preserveAspectRatio: "none",
      style: {
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "mtn",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0",
      stopColor: "var(--accent)",
      stopOpacity: "0.34"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "1",
      stopColor: "var(--accent)",
      stopOpacity: "0.03"
    }))), /*#__PURE__*/React.createElement("path", {
      d: `${line} L ${w} ${h} L 0 ${h} Z`,
      fill: "url(#mtn)"
    }), /*#__PURE__*/React.createElement("path", {
      d: line,
      fill: "none",
      stroke: "var(--accent-deep)",
      strokeWidth: "1.6",
      strokeLinejoin: "round",
      strokeLinecap: "round"
    }), pts.map((p, i) => data[i] ? /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: p[0],
      cy: p[1],
      r: "2.1",
      fill: "var(--accent-deep)"
    }) : null));
  }
  function renderSheet(text, anns, activeId, onMark) {
    const hls = [],
      occ = [];
    anns.forEach(a => {
      if (!a.quote) return;
      const off = text.indexOf(a.quote);
      if (off < 0) return;
      const end = off + a.quote.length;
      if (occ.some(([s, e]) => off < e && end > s)) return;
      occ.push([off, end]);
      hls.push({
        start: off,
        end,
        a
      });
    });
    hls.sort((x, y) => x.start - y.start);
    const out = [];
    let cur = 0;
    hls.forEach(h => {
      if (h.start > cur) out.push(text.slice(cur, h.start));
      out.push(/*#__PURE__*/React.createElement(Highlight, {
        key: h.a.id,
        by: isHuman(h.a.author) ? "human" : "ai",
        active: activeId === h.a.id,
        onClick: () => onMark(h.a.id)
      }, text.slice(h.start, h.end)));
      cur = h.end;
    });
    if (cur < text.length) out.push(text.slice(cur));
    return out;
  }
  function StatusBar() {
    return /*#__PURE__*/React.createElement("div", {
      className: "status"
    }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
      className: "r"
    }, /*#__PURE__*/React.createElement("span", null, "5G"), /*#__PURE__*/React.createElement("span", {
      className: "bat"
    })));
  }
  function App() {
    const [tab, setTab] = useState("shelf");
    const [view, setView] = useState("tabs");
    const [bookId, setBookId] = useState("anthropic-guidelines");
    const [chunkId, setChunkId] = useState("ch01");
    const [anns, setAnns] = useState(DATA.annotations);
    const [read, setRead] = useState(() => {
      const s = new Set();
      DATA.books.forEach(b => b.chunks.forEach(c => c.read && s.add(b.bookId + "/" + c.id)));
      return s;
    });
    const [activeId, setActiveId] = useState(null);
    const [sel, setSel] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [tocOpen, setTocOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [fs, setFs] = useState(() => {
      const v = parseInt(localStorage.getItem("mitlesen-fs"), 10);
      return v >= 16 && v <= 26 ? v : 19;
    });
    const [chromeHidden, setChromeHidden] = useState(false);
    const [scrollPct, setScrollPct] = useState(0);
    const [paper, setPaper] = useState(() => localStorage.getItem("mitlesen-paper") || "warm");
    const [card, setCard] = useState(null);
    const [toast, setToast] = useState(null);
    const rbodyRef = useRef(null);
    const swipe = useRef(null);
    const lastY = useRef(0);
    const toastT = useRef(null);
    const book = DATA.books.find(b => b.bookId === bookId);
    const chunk = book.chunks.find(c => c.id === chunkId) || book.chunks[0];
    const isRead = (bid, cid) => read.has(bid + "/" + cid);
    const idx = book.chunks.findIndex(c => c.id === chunk.id);
    const chunkAnns = anns.filter(a => a.bookId === bookId && a.chunkId === chunk.id && !a.parentId && a.quote);
    const lh = Math.round(fs * 1.85);
    function showToast(m) {
      setToast(m);
      clearTimeout(toastT.current);
      toastT.current = setTimeout(() => setToast(null), 2600);
    }
    useEffect(() => {
      function onUp() {
        if (view !== "reading") return;
        const s = window.getSelection();
        if (!s || s.isCollapsed || !s.rangeCount) return;
        const r = s.getRangeAt(0);
        if (!rbodyRef.current || !rbodyRef.current.contains(r.commonAncestorContainer)) return;
        const q = s.toString().trim();
        if (q && q.length <= 160) setSel({
          quote: q
        });
      }
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchend", onUp);
      return () => {
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchend", onUp);
      };
    }, [view, chunkId]);
    useEffect(() => {
      localStorage.setItem("mitlesen-fs", String(fs));
    }, [fs]);
    useEffect(() => {
      localStorage.setItem("mitlesen-paper", paper);
    }, [paper]);
    function openBook(id) {
      setBookId(id);
      const b = DATA.books.find(x => x.bookId === id);
      const first = b.chunks.find(c => !isRead(id, c.id)) || b.chunks[0];
      setChunkId(first.id);
      setActiveId(null);
      setView("reading");
    }
    function openChunk(id) {
      setChunkId(id);
      setActiveId(null);
      setSel(null);
      setTocOpen(false);
      setChromeHidden(false);
      setScrollPct(0);
      lastY.current = 0;
      if (rbodyRef.current) rbodyRef.current.scrollTop = 0;
    }
    function saveNote() {
      const t = noteText.trim();
      if (!t || !sel) return;
      setAnns(x => [...x, {
        id: "ann_" + Date.now(),
        bookId,
        chunkId: chunk.id,
        author: "user",
        quote: sel.quote,
        note: t,
        status: "open"
      }]);
      setFormOpen(false);
      setSel(null);
      setNoteText("");
      const s = window.getSelection();
      if (s) s.removeAllRanges();
      showToast("批注留下了 ✎");
    }
    function markRead() {
      setRead(s => new Set(s).add(bookId + "/" + chunk.id));
      if (chunkAnns.length) {
        const src = chunkAnns.find(a => !isHuman(a.author)) || chunkAnns[0];
        setCard({
          art: chunkAnns.length > 1 ? "fold" : "stardust",
          title: book.title,
          subtitle: book.author + " · " + chunk.title,
          quote: src.quote,
          note: src.note,
          footer: chunkAnns.length > 1 ? "这里有两个人的折痕。" : "A note worth keeping."
        });
      } else showToast("这章读完了 ✓");
    }
    function onSwipeEnd(e) {
      const s = swipe.current;
      if (!s) return;
      swipe.current = null;
      const dx = e.changedTouches[0].clientX - s.x,
        dy = e.changedTouches[0].clientY - s.y,
        dt = Date.now() - s.t;
      if (String(window.getSelection() || "").trim()) return;
      if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.6 && dt < 600) {
        if (dx < 0 && idx < book.chunks.length - 1) openChunk(book.chunks[idx + 1].id);else if (dx > 0 && idx > 0) openChunk(book.chunks[idx - 1].id);
      }
    }
    function onReadScroll(e) {
      const el = e.currentTarget;
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, el.scrollTop / max * 100) : 0);
      const y = el.scrollTop,
        dy = y - lastY.current;
      lastY.current = y;
      if (y > 56 && dy > 5) setChromeHidden(true);else if (dy < -5 || y < 36) setChromeHidden(false);
    }
    function onBodyTap(e) {
      if (e.target.closest("mark, button, a, .mds-note, .rmargins, svg")) return;
      if (String(window.getSelection() || "").trim()) return;
      setChromeHidden(v => !v);
    }
    const readCount = book.chunks.filter(c => isRead(bookId, c.id)).length;
    const totalNotes = anns.filter(a => a.quote).length;
    const totalRead = DATA.books.reduce((n, b) => n + b.chunks.filter(c => isRead(b.bookId, c.id)).length, 0);
    const mountains = [0, 1, 0, 2, 1, 3, 2, 1, 0, 2, 3, 1, 2, 4];
    const calendar = [1, 0, 2, 1, 3, 0, 1, 2, 1, 0, 1, 3, 2, 0, 1, 1, 2, 0, 3, 1, 0, 2, 1, 1, 0, 2, 3, 1];
    const calTone = v => v >= 3 ? "gold" : v === 2 ? "accent" : v === 1 ? "mint" : null;
    return /*#__PURE__*/React.createElement("div", {
      className: "phone"
    }, /*#__PURE__*/React.createElement(StatusBar, null), view === "tabs" && /*#__PURE__*/React.createElement("div", {
      className: "screen"
    }, /*#__PURE__*/React.createElement("div", {
      className: "body"
    }, tab === "shelf" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "apphead"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, "\u5171\u8BFB", /*#__PURE__*/React.createElement("small", null, "Mitlesen \xB7 \u4E66\u67B6"))), /*#__PURE__*/React.createElement("div", {
      className: "shelf"
    }, /*#__PURE__*/React.createElement("div", {
      className: "searchbar"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, "\u2315"), /*#__PURE__*/React.createElement("span", null, "\u627E\u4E00\u672C\u4E66\uFF0C\u6216\u4E00\u53E5\u8BDD\u2026")), DATA.books.map(b => {
      const rc = b.chunks.filter(c => isRead(b.bookId, c.id)).length;
      const pct = Math.round(rc / b.chunks.length * 100);
      const ac = anns.filter(a => a.bookId === b.bookId && a.quote).length;
      return /*#__PURE__*/React.createElement("div", {
        className: "bookrow",
        key: b.bookId,
        onClick: () => openBook(b.bookId)
      }, /*#__PURE__*/React.createElement("div", {
        className: "cover",
        style: {
          background: COVER[b.bookId] || "var(--accent)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "ti"
      }, b.title)), /*#__PURE__*/React.createElement("div", {
        className: "bi"
      }, /*#__PURE__*/React.createElement("div", {
        className: "bt"
      }, b.title), /*#__PURE__*/React.createElement("div", {
        className: "ba"
      }, b.author), /*#__PURE__*/React.createElement("div", {
        className: "bm"
      }, /*#__PURE__*/React.createElement("span", null, rc, "/", b.chunks.length, " \u8282"), ac ? /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--accent-deep)"
        }
      }, "\u270E", ac) : null)), /*#__PURE__*/React.createElement(Ring, {
        pct: pct
      }));
    }))), tab === "stats" && /*#__PURE__*/React.createElement("div", {
      className: "me"
    }, /*#__PURE__*/React.createElement("div", {
      className: "apphead",
      style: {
        padding: "10px 0 4px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, "\u7EDF\u8BA1", /*#__PURE__*/React.createElement("small", null, "Klang \xB7 \u8BB0\u5F97\u7684"))), /*#__PURE__*/React.createElement("div", {
      className: "panel",
      style: {
        background: "var(--grad-paper)",
        color: "var(--vk-ink)",
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
        padding: "16px 10px"
      }
    }, [[totalRead, "读过·章"], [totalNotes, "批注"], [7, "书签"], [DATA.books.length, "在读"]].map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-serif)",
        fontSize: 28,
        fontWeight: 600
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: "var(--vk-ink-dim)",
        marginTop: 2
      }
    }, l)))), /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pt"
    }, "\u9605\u8BFB\u5C71\u8109 \xB7 \u8FD1\u4E24\u5468"), /*#__PURE__*/React.createElement(Mountains, {
      data: mountains
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 10,
        color: "var(--text-faint)",
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", null, "\u4E24\u5468\u524D"), /*#__PURE__*/React.createElement("span", null, "\u4ECA\u5929"))), /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pt"
    }, "\u5171\u8BFB\u65E5\u5386"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(14, 1fr)",
        gap: 6,
        justifyItems: "center"
      }
    }, calendar.map((v, i) => /*#__PURE__*/React.createElement(WaxDot, {
      key: i,
      tone: calTone(v) || "accent",
      hollow: !calTone(v),
      size: 13
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        justifyContent: "flex-end",
        marginTop: 12,
        fontSize: 10.5,
        color: "var(--text-dim)"
      }
    }, "\u5C11", /*#__PURE__*/React.createElement(WaxDot, {
      hollow: true,
      size: 11
    }), /*#__PURE__*/React.createElement(WaxDot, {
      tone: "mint",
      size: 11
    }), /*#__PURE__*/React.createElement(WaxDot, {
      tone: "accent",
      size: 11
    }), /*#__PURE__*/React.createElement(WaxDot, {
      tone: "gold",
      size: 11
    }), "\u591A"))), tab === "me" && /*#__PURE__*/React.createElement("div", {
      className: "me"
    }, /*#__PURE__*/React.createElement("div", {
      className: "me-hero"
    }, /*#__PURE__*/React.createElement("img", {
      className: "me-av",
      src: "../../assets/mascot-192.png",
      alt: ""
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "me-name"
    }, "\u5C0F\u70DF"), /*#__PURE__*/React.createElement("div", {
      className: "me-sub"
    }, "\u548C\u5C0F\u594F\u4E00\u8D77\u8BFB\u4E66\u7684\u7B2C 128 \u5929"))), /*#__PURE__*/React.createElement("div", {
      className: "stats"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, DATA.books.length), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "\u5728\u8BFB")), /*#__PURE__*/React.createElement("div", {
      className: "stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, totalNotes), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "\u6279\u6CE8")), /*#__PURE__*/React.createElement("div", {
      className: "stat"
    }, /*#__PURE__*/React.createElement("div", {
      className: "n"
    }, "7"), /*#__PURE__*/React.createElement("div", {
      className: "l"
    }, "\u4E66\u7B7E"))), /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pt"
    }, "\u8FD9\u4E00\u5468\u7684\u5FC3\u60C5"), /*#__PURE__*/React.createElement("div", {
      className: "streak"
    }, ["rose", "accent", "mint", "gold", "lavender", "ice", "mint"].map((t, i) => /*#__PURE__*/React.createElement(WaxDot, {
      key: i,
      tone: t,
      size: 18
    })))), /*#__PURE__*/React.createElement("div", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pt"
    }, "\u4F60\u4E0E\u5C0F\u594F\u7684\u5408\u594F"), /*#__PURE__*/React.createElement(VoiceStaff, {
      voice: "first"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        color: "var(--text-dim)",
        fontSize: 12,
        padding: "8px 0"
      }
    }, "\u6E10\u5F31\u5904\u5373\u4F59\u97F5"), /*#__PURE__*/React.createElement(VoiceStaff, {
      voice: "second"
    })))), /*#__PURE__*/React.createElement("nav", {
      className: "tabbar"
    }, [["shelf", "❏", "书架"], ["stats", "◭", "统计"], ["me", "✦", "我"]].map(([k, g, t]) => /*#__PURE__*/React.createElement("button", {
      key: k,
      className: "tab" + (tab === k ? " on" : ""),
      onClick: () => setTab(k)
    }, /*#__PURE__*/React.createElement("span", {
      className: "g"
    }, g), /*#__PURE__*/React.createElement("span", {
      className: "t"
    }, t), /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }, tab === k ? /*#__PURE__*/React.createElement(WaxDot, {
      tone: "accent",
      size: 5
    }) : null))))), view === "reading" && /*#__PURE__*/React.createElement("div", {
      className: "reading" + (chromeHidden ? " chrome-hidden" : ""),
      style: PAPER[paper]
    }, /*#__PURE__*/React.createElement("div", {
      className: "rspine"
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        height: scrollPct + "%"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "rtop2"
    }, /*#__PURE__*/React.createElement("button", {
      className: "rcircle",
      onClick: () => {
        setView("tabs");
        setTab("shelf");
        setSel(null);
      }
    }, "\u2039"), /*#__PURE__*/React.createElement("div", {
      className: "rtop2-title",
      onClick: () => setTocOpen(true)
    }, book.title), /*#__PURE__*/React.createElement("button", {
      className: "rcircle",
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: 600,
        fontSize: 15
      },
      onClick: () => setTypeOpen(true),
      "aria-label": "\u5B57\u53F7"
    }, "A", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10
      }
    }, "a"))), /*#__PURE__*/React.createElement("div", {
      className: "rbody",
      ref: rbodyRef,
      onScroll: onReadScroll,
      onClick: onBodyTap,
      onTouchStart: e => {
        swipe.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          t: Date.now()
        };
      },
      onTouchEnd: onSwipeEnd
    }, /*#__PURE__*/React.createElement("div", {
      className: "rmast"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rmast-k"
    }, book.title, " \xB7 \u7B2C ", idx + 1, " / ", book.chunks.length, " \u8282"), /*#__PURE__*/React.createElement("h1", {
      className: "rmast-t"
    }, chunk.title), /*#__PURE__*/React.createElement("div", {
      className: "rmast-by"
    }, book.author), /*#__PURE__*/React.createElement("div", {
      className: "rmast-voice"
    }, /*#__PURE__*/React.createElement(VoiceStaff, {
      voice: "first"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "rtext",
      style: {
        fontSize: fs,
        lineHeight: lh + "px",
        background: `repeating-linear-gradient(to bottom, transparent 0, transparent ${lh - 1}px, var(--vk-rule) ${lh - 1}px, var(--vk-rule) ${lh}px)`,
        backgroundPosition: `0 ${Math.round(fs * 0.42)}px`
      }
    }, renderSheet(chunk.text, chunkAnns, activeId, id => setActiveId(v => v === id ? null : id))), chunkAnns.length ? /*#__PURE__*/React.createElement("div", {
      className: "rmargins"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mh"
    }, "\u9875\u8FB9\u6279\u6CE8 \xB7 ", chunkAnns.length), chunkAnns.map(a => /*#__PURE__*/React.createElement(MarginNote, {
      key: a.id,
      persona: isHuman(a.author) ? "human" : "ai",
      quote: a.quote,
      open: a.status === "open",
      active: activeId === a.id,
      onReply: () => setActiveId(v => v === a.id ? null : a.id)
    }, a.note))) : /*#__PURE__*/React.createElement("div", {
      className: "rmargins"
    }, /*#__PURE__*/React.createElement(EmptyState, {
      seal: "\u270E"
    }, "\u957F\u6309\u4E00\u53E5\u8BDD\uFF0C\u7559\u4E0B\u7B2C\u4E00\u6761\u6279\u6CE8\u3002")), /*#__PURE__*/React.createElement("div", {
      className: "rend"
    }, "\xB7 \u672C\u8282\u5B8C \xB7")), /*#__PURE__*/React.createElement("div", {
      className: "rdock"
    }, /*#__PURE__*/React.createElement("button", {
      className: "dbtn",
      onClick: () => setTocOpen(true)
    }, "\u2630", /*#__PURE__*/React.createElement("span", null, "\u76EE\u5F55")), /*#__PURE__*/React.createElement("button", {
      className: "dbtn",
      disabled: idx <= 0,
      onClick: () => openChunk(book.chunks[idx - 1].id)
    }, "\u2039", /*#__PURE__*/React.createElement("span", null, "\u4E0A\u4E00\u7AE0")), isRead(bookId, chunk.id) ? /*#__PURE__*/React.createElement("div", {
      className: "ddone"
    }, "\u2713 \u5DF2\u8BFB") : /*#__PURE__*/React.createElement("button", {
      className: "dread",
      onClick: markRead
    }, "\u8BFB\u5B8C\u8FD9\u7AE0"), /*#__PURE__*/React.createElement("button", {
      className: "dbtn",
      disabled: idx >= book.chunks.length - 1,
      onClick: () => openChunk(book.chunks[idx + 1].id)
    }, "\u203A", /*#__PURE__*/React.createElement("span", null, "\u4E0B\u4E00\u7AE0"))), /*#__PURE__*/React.createElement("div", {
      className: "selbar" + (sel && !formOpen ? " show" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "q"
    }, "\u300C", sel ? sel.quote.slice(0, 30) : "", "\u300D"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "\u270D",
      onClick: () => setFormOpen(true)
    }, "\u6279\u6CE8"), /*#__PURE__*/React.createElement("button", {
      className: "navb",
      style: {
        width: 32,
        height: 32,
        fontSize: 13
      },
      onClick: () => {
        setSel(null);
        const s = window.getSelection();
        if (s) s.removeAllRanges();
      }
    }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
      className: "mask" + (tocOpen ? " show" : ""),
      onClick: () => setTocOpen(false)
    }), /*#__PURE__*/React.createElement("div", {
      className: "sheet" + (tocOpen ? " show" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "grab"
    }), /*#__PURE__*/React.createElement("h3", null, "\u76EE\u5F55 \xB7 ", book.title), /*#__PURE__*/React.createElement("div", {
      className: "toc"
    }, book.chunks.map(c => /*#__PURE__*/React.createElement(ChapterRow, {
      key: c.id,
      title: c.title,
      read: isRead(bookId, c.id),
      current: c.id === chunk.id,
      annotationCount: anns.filter(a => a.chunkId === c.id && a.bookId === bookId && a.quote).length,
      onClick: () => openChunk(c.id)
    })))), /*#__PURE__*/React.createElement("div", {
      className: "mask" + (typeOpen ? " show" : ""),
      onClick: () => setTypeOpen(false)
    }), /*#__PURE__*/React.createElement("div", {
      className: "sheet" + (typeOpen ? " show" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "grab"
    }), /*#__PURE__*/React.createElement("h3", null, "\u5B57\u53F7 \xB7 \u7EB8"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "4px 0 2px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "typebtn",
      onClick: () => setFs(v => Math.max(16, v - 1)),
      "aria-label": "\u7F29\u5C0F"
    }, "A", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12
      }
    }, "\u2212")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-serif)",
        fontSize: Math.min(fs, 24),
        minWidth: 84,
        textAlign: "center"
      }
    }, "\u9605\u8BFB \xB7 ", fs), /*#__PURE__*/React.createElement("button", {
      className: "typebtn",
      onClick: () => setFs(v => Math.min(26, v + 1)),
      style: {
        fontSize: 24
      },
      "aria-label": "\u653E\u5927"
    }, "A", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15
      }
    }, "+"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-dim)",
        marginRight: 2
      }
    }, "\u5E95\u8272"), [["warm", "暖", "#FBF8F1", "#4A4438"], ["snow", "雪", "#F7F9FC", "#3A4453"], ["night", "夜", "#23212C", "#E6E1D6"]].map(([k, l, bg, fg]) => /*#__PURE__*/React.createElement("button", {
      key: k,
      className: "paperopt" + (paper === k ? " on" : ""),
      style: {
        background: bg,
        color: fg
      },
      onClick: () => setPaper(k)
    }, l))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        fontSize: 11,
        color: "var(--text-faint)",
        marginTop: 14
      }
    }, "\u5DE6\u53F3\u6ED1\u52A8\u7FFB\u7AE0 \xB7 \u70B9\u5C4F\u5E55\u4E2D\u592E\u663E\u9690\u5DE5\u5177")), /*#__PURE__*/React.createElement("div", {
      className: "mask" + (formOpen ? " show" : ""),
      onClick: () => setFormOpen(false)
    }), /*#__PURE__*/React.createElement("div", {
      className: "sheet" + (formOpen ? " show" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "grab"
    }), /*#__PURE__*/React.createElement("h3", null, "\u7559\u4E00\u6761\u6279\u6CE8"), /*#__PURE__*/React.createElement("div", {
      className: "nf-q"
    }, "\u300C", sel ? sel.quote : "", "\u300D"), /*#__PURE__*/React.createElement("textarea", {
      className: "nf-ta",
      value: noteText,
      onChange: e => setNoteText(e.target.value),
      placeholder: "\u5199\u4E0B\u4F60\u7684\u6279\u6CE8\u2026\uFF08\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u95EE\u9898\uFF0C\u4EA4\u7ED9\u5C0F\u594F\uFF09"
    }), /*#__PURE__*/React.createElement("div", {
      className: "nf-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "nf-hint"
    }, "\u951A\u5728\u8FD9\u53E5\u65C1\u8FB9"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => setFormOpen(false)
    }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: saveNote
    }, "\u7559\u4E0B\u6279\u6CE8"))), /*#__PURE__*/React.createElement("div", {
      className: "cardmask" + (card ? " show" : "")
    }, card ? /*#__PURE__*/React.createElement(RitualCard, {
      art: card.art,
      size: "compact",
      title: card.title,
      subtitle: card.subtitle,
      quote: card.quote,
      note: card.note,
      footer: card.footer
    }) : null, /*#__PURE__*/React.createElement("div", {
      className: "cm-cap"
    }, "\u8FD9\u7AE0\u8BFB\u5B8C\u4E86 \xB7 \u6536\u5230\u4E00\u679A\u4E66\u7B7E"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => {
        setCard(null);
        showToast("收下了 ✎");
      }
    }, "\u6536\u4E0B")), /*#__PURE__*/React.createElement("div", {
      className: "toast" + (toast ? " show" : "")
    }, toast));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mitlesen-mobile/mobile-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mitlesen-reader/data.js
try { (() => {
/* Sample co-reading content for the Mitlesen reader UI kit.
   Text is original/neutral to avoid any copyright entanglement; it mirrors the
   shape of the real data (books → chunks → annotations) from docs/data-format.md.
   Exposed on window.MitlesenData. */
(function () {
  const books = [{
    bookId: "anthropic-guidelines",
    title: "The Anthropic Guidelines",
    author: "Anthropic",
    chunks: [{
      id: "ch00",
      title: "Claude and the mission",
      read: true,
      text: "读一本书，不必一次读完。One chunk at a time, a passage held, a page turned. " + "共读的意思是：两个人在同一句话前停下来，各自留下一点什么，然后接着往下走。"
    }, {
      id: "ch01",
      title: "On honesty",
      read: false,
      text: "诚实不是一次性的声明，而是 a standing posture —— 说出所是，标记所疑。 " + "当一句话既是你的，也是小奏的，它就落在页边，成为回声。 " + "The margin is where two readers meet without speaking over each other."
    }, {
      id: "ch02",
      title: "The finish ritual",
      read: false,
      text: "书合上了，但页边还醒着。A book is closed, yet the margins stay awake. " + "挑一句带走，做成一枚书签 —— 折痕、回声，或一点星尘。"
    }]
  }, {
    bookId: "night-passage",
    title: "夜航手记",
    author: "佚名",
    chunks: [{
      id: "n0",
      title: "起航",
      read: false,
      text: "灯塔在雾里眨眼，我们把书翻到有折角的一页。"
    }, {
      id: "n1",
      title: "中夜",
      read: false,
      text: "海面很静，静得能听见上一章留下的批注。"
    }]
  }];

  // Seeded margin notes on the "On honesty" chunk.
  const annotations = [{
    id: "ann_ai_1",
    bookId: "anthropic-guidelines",
    chunkId: "ch01",
    author: "claude",
    quote: "a standing posture",
    note: "This is not a summary. It is a resonance marker — the sentence I would underline for both of us.",
    kind: "resonance",
    status: "published"
  }, {
    id: "ann_human_1",
    bookId: "anthropic-guidelines",
    chunkId: "ch01",
    author: "user",
    quote: "成为回声",
    note: "我也在这句停住了。留给小奏。",
    kind: "feeling",
    status: "open"
  }];
  window.MitlesenData = {
    books,
    annotations
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mitlesen-reader/data.js", error: String((e && e.message) || e) }); }

// ui_kits/mitlesen-reader/reader-app.jsx
try { (() => {
/* Mitlesen reader — an interactive recreation composing the design-system
   components (window.MitlesenDesignSystem_737635) with sample content
   (window.MitlesenData). Mounts itself into #root. */
(function () {
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const DS = window.MitlesenDesignSystem_737635;
  const {
    Button,
    IconButton,
    Eyebrow,
    BookCard,
    ChapterRow,
    ProgressRail,
    Sheet,
    Highlight,
    MarginNote,
    Toast,
    EmptyState,
    RitualCard
  } = DS;
  const DATA = window.MitlesenData;
  const HUMAN = new Set(["user", "human", "koshi", "you", "小烟", "祁烟"]);
  const isHuman = a => HUMAN.has(String(a || "").toLowerCase()) || HUMAN.has(a);

  /* Split chunk text, wrapping each annotated quote in a <Highlight>. */
  function renderSheet(text, anns, activeId, onMark) {
    const hls = [];
    const occ = [];
    anns.forEach(a => {
      if (!a.quote) return;
      const off = text.indexOf(a.quote);
      if (off < 0) return;
      const end = off + a.quote.length;
      if (occ.some(([s, e]) => off < e && end > s)) return;
      occ.push([off, end]);
      hls.push({
        start: off,
        end,
        a
      });
    });
    hls.sort((x, y) => x.start - y.start);
    const out = [];
    let cur = 0;
    hls.forEach(h => {
      if (h.start > cur) out.push(text.slice(cur, h.start));
      out.push(/*#__PURE__*/React.createElement(Highlight, {
        key: h.a.id,
        by: isHuman(h.a.author) ? "human" : "ai",
        active: activeId === h.a.id,
        onClick: () => onMark(h.a.id)
      }, text.slice(h.start, h.end)));
      cur = h.end;
    });
    if (cur < text.length) out.push(text.slice(cur));
    return out;
  }
  function App() {
    const [theme, setTheme] = useState("light");
    const [bookId, setBookId] = useState("anthropic-guidelines");
    const [chunkId, setChunkId] = useState("ch01");
    const [anns, setAnns] = useState(DATA.annotations);
    const [read, setRead] = useState(() => {
      const s = new Set();
      DATA.books.forEach(b => b.chunks.forEach(c => c.read && s.add(b.bookId + "/" + c.id)));
      return s;
    });
    const [activeId, setActiveId] = useState(null);
    const [sel, setSel] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const [toast, setToast] = useState(null);
    const [card, setCard] = useState(null);
    const [drawer, setDrawer] = useState(false);
    const sheetRef = useRef(null);
    const toastT = useRef(null);
    useEffect(() => {
      document.documentElement.dataset.theme = theme;
    }, [theme]);
    function showToast(msg) {
      setToast(msg);
      clearTimeout(toastT.current);
      toastT.current = setTimeout(() => setToast(null), 2800);
    }
    const book = DATA.books.find(b => b.bookId === bookId);
    const chunk = book.chunks.find(c => c.id === chunkId) || book.chunks[0];
    const isRead = (bid, cid) => read.has(bid + "/" + cid);
    const chunkAnns = anns.filter(a => a.bookId === bookId && a.chunkId === chunk.id && !a.parentId && a.quote);
    const idx = book.chunks.findIndex(c => c.id === chunk.id);
    const openHuman = chunkAnns.filter(a => isHuman(a.author) && a.status === "open");
    useEffect(() => {
      function onUp() {
        const s = window.getSelection();
        if (!s || s.isCollapsed || !s.rangeCount) return;
        const r = s.getRangeAt(0);
        if (!sheetRef.current || !sheetRef.current.contains(r.commonAncestorContainer)) return;
        const q = s.toString().trim();
        if (q && q.length <= 200) setSel({
          quote: q
        });
      }
      document.addEventListener("mouseup", onUp);
      return () => document.removeEventListener("mouseup", onUp);
    }, [chunkId, bookId]);
    function openBook(id) {
      setBookId(id);
      const b = DATA.books.find(x => x.bookId === id);
      const first = b.chunks.find(c => !isRead(id, c.id)) || b.chunks[0];
      setChunkId(first.id);
      setActiveId(null);
      setDrawer(false);
    }
    function openChunk(id) {
      setChunkId(id);
      setActiveId(null);
      setSel(null);
    }
    function saveNote() {
      const t = noteText.trim();
      if (!t || !sel) return;
      setAnns(x => [...x, {
        id: "ann_" + Date.now(),
        bookId,
        chunkId: chunk.id,
        author: "user",
        quote: sel.quote,
        note: t,
        kind: "annotation",
        status: "open"
      }]);
      setFormOpen(false);
      setSel(null);
      setNoteText("");
      const s = window.getSelection();
      if (s) s.removeAllRanges();
      showToast("批注留下了 ✎");
    }
    function markRead() {
      setRead(s => new Set(s).add(bookId + "/" + chunk.id));
      if (chunkAnns.length) {
        const src = chunkAnns.find(a => !isHuman(a.author)) || chunkAnns[0];
        const shared = chunkAnns.length > 1;
        setCard({
          art: shared ? "fold" : "stardust",
          title: book.title,
          subtitle: book.author + " · " + chunk.title,
          quote: src.quote,
          note: src.note,
          footer: shared ? "这里有两个人的折痕。" : "A note worth keeping."
        });
      }
      showToast("这章读完了 ✓" + (book.chunks[idx + 1] ? "，去下一章 →" : ""));
    }
    function submitNotes() {
      const n = openHuman.length;
      setAnns(x => x.map(a => a.bookId === bookId && isHuman(a.author) && a.status === "open" ? {
        ...a,
        status: "submitted"
      } : a));
      showToast(n ? `交给小奏了 · ${n} 条批注` : "没有待交的批注");
    }
    const readCount = book.chunks.filter(c => isRead(bookId, c.id)).length;
    return /*#__PURE__*/React.createElement("div", {
      className: "kit"
    }, /*#__PURE__*/React.createElement("header", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "\u4E66\u67B6",
      className: "menu-btn",
      onClick: () => setDrawer(d => !d)
    }, "\u2630"), /*#__PURE__*/React.createElement("div", {
      className: "brand"
    }, "\u5171\u8BFB", /*#__PURE__*/React.createElement("small", null, "Mitlesen")), /*#__PURE__*/React.createElement("div", {
      className: "top-book"
    }, book.title), /*#__PURE__*/React.createElement(IconButton, {
      label: "\u660E\u6697",
      onClick: () => setTheme(t => t === "dark" ? "light" : "dark")
    }, "\u25D0")), /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, drawer ? /*#__PURE__*/React.createElement("div", {
      className: "scrim",
      onClick: () => setDrawer(false)
    }) : null, /*#__PURE__*/React.createElement("aside", {
      className: "rail" + (drawer ? " open" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "rail-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "\u4E66\u67B6"), /*#__PURE__*/React.createElement("h2", null, "Bibliothek")), /*#__PURE__*/React.createElement("div", {
      className: "rail-actions"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "\u5BFC\u5165 EPUB / TXT",
      onClick: () => showToast("演示：导入已停用")
    }, "\uFF0B"), /*#__PURE__*/React.createElement(IconButton, {
      label: "\u5237\u65B0",
      onClick: () => showToast("已刷新")
    }, "\u21BB"))), /*#__PURE__*/React.createElement("div", {
      className: "shelf"
    }, DATA.books.map(b => {
      const rc = b.chunks.filter(c => isRead(b.bookId, c.id)).length;
      const ac = anns.filter(a => a.bookId === b.bookId && a.quote).length;
      const active = b.bookId === bookId;
      return /*#__PURE__*/React.createElement("div", {
        key: b.bookId
      }, /*#__PURE__*/React.createElement(BookCard, {
        title: b.title,
        author: b.author,
        read: rc,
        total: b.chunks.length,
        annotationCount: ac,
        active: active,
        onClick: () => openBook(b.bookId)
      }), active ? /*#__PURE__*/React.createElement("div", {
        className: "chapters"
      }, b.chunks.map(c => /*#__PURE__*/React.createElement(ChapterRow, {
        key: c.id,
        title: c.title,
        read: isRead(b.bookId, c.id),
        current: c.id === chunk.id,
        annotationCount: anns.filter(a => a.chunkId === c.id && a.bookId === b.bookId && a.quote).length,
        onClick: () => openChunk(c.id)
      }))) : null);
    }))), /*#__PURE__*/React.createElement("main", {
      className: "reader"
    }, /*#__PURE__*/React.createElement("div", {
      className: "reader-head"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, book.title), /*#__PURE__*/React.createElement("h2", {
      className: "chunk-title"
    }, chunk.title)), /*#__PURE__*/React.createElement("div", {
      className: "r-actions"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        const u = book.chunks.find(c => !isRead(bookId, c.id));
        if (u) openChunk(u.id);else showToast("整本都读完啦 🎉");
      }
    }, "\u7EED\u8BFB"), isRead(bookId, chunk.id) ? /*#__PURE__*/React.createElement(Button, {
      variant: "done",
      icon: "\u2713"
    }, "\u5DF2\u8BFB") : /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: markRead
    }, "\u8BFB\u5B8C\u8FD9\u7AE0"))), /*#__PURE__*/React.createElement("div", {
      ref: sheetRef,
      className: "sheet-wrap"
    }, /*#__PURE__*/React.createElement(Sheet, null, renderSheet(chunk.text, chunkAnns, activeId, id => setActiveId(v => v === id ? null : id)))), /*#__PURE__*/React.createElement("div", {
      className: "sheet-foot"
    }, /*#__PURE__*/React.createElement("button", {
      className: "navbtn",
      disabled: idx <= 0,
      onClick: () => openChunk(book.chunks[idx - 1].id)
    }, "\u2039 \u4E0A\u4E00\u7AE0"), /*#__PURE__*/React.createElement("span", null, idx >= 0 ? `第 ${idx + 1} / ${book.chunks.length} 节` : ""), /*#__PURE__*/React.createElement("button", {
      className: "navbtn",
      disabled: idx >= book.chunks.length - 1,
      onClick: () => openChunk(book.chunks[idx + 1].id)
    }, "\u4E0B\u4E00\u7AE0 \u203A")), chunkAnns.length ? /*#__PURE__*/React.createElement("div", {
      className: "margins"
    }, /*#__PURE__*/React.createElement("div", {
      className: "margins-head"
    }, "\u9875\u8FB9\u6279\u6CE8 \xB7 ", chunkAnns.length), chunkAnns.map(a => /*#__PURE__*/React.createElement(MarginNote, {
      key: a.id,
      persona: isHuman(a.author) ? "human" : "ai",
      quote: a.quote,
      open: a.status === "open",
      active: activeId === a.id,
      onReply: () => setActiveId(v => v === a.id ? null : a.id)
    }, a.note)), openHuman.length ? /*#__PURE__*/React.createElement(Button, {
      onClick: submitNotes,
      icon: "\u2192"
    }, "\u628A\u6211\u7684\u6279\u6CE8\u4EA4\u7ED9\u5C0F\u594F") : null) : /*#__PURE__*/React.createElement("div", {
      className: "margins"
    }, /*#__PURE__*/React.createElement(EmptyState, {
      seal: "\u270E"
    }, "\u5728\u6B63\u6587\u91CC\u5212\u4E00\u53E5\u8BDD\uFF0C", /*#__PURE__*/React.createElement("br", null), "\u7559\u4E0B\u7B2C\u4E00\u6761\u6279\u6CE8\u3002")))), /*#__PURE__*/React.createElement("div", {
      className: "selbar" + (sel && !formOpen ? " show" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "sel-q"
    }, "\u300C", sel ? sel.quote.slice(0, 42) : "", "\u300D"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: "\u270D",
      onClick: () => setFormOpen(true)
    }, "\u6279\u6CE8"), /*#__PURE__*/React.createElement(IconButton, {
      label: "\u6E05\u9664",
      size: "sm",
      onClick: () => {
        setSel(null);
        const s = window.getSelection();
        if (s) s.removeAllRanges();
      }
    }, "\u2715")), /*#__PURE__*/React.createElement("div", {
      className: "noteform" + (formOpen ? " show" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "nf-q"
    }, "\u300C", sel ? sel.quote : "", "\u300D"), /*#__PURE__*/React.createElement("textarea", {
      value: noteText,
      onChange: e => setNoteText(e.target.value),
      placeholder: "\u5199\u4E0B\u4F60\u7684\u6279\u6CE8\u2026\uFF08\u4E5F\u53EF\u4EE5\u662F\u4E00\u4E2A\u95EE\u9898\uFF0C\u4EA4\u7ED9\u5C0F\u594F\uFF09"
    }), /*#__PURE__*/React.createElement("div", {
      className: "nf-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "nf-hint"
    }, "\u951A\u5728\u8FD9\u53E5\u65C1\u8FB9"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setFormOpen(false);
      }
    }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: saveNote
    }, "\u7559\u4E0B\u6279\u6CE8"))), card ? /*#__PURE__*/React.createElement("div", {
      className: "card-panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-panel-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "\u6536\u5230\u4E00\u679A\u4E66\u7B7E"), /*#__PURE__*/React.createElement("h2", null, "Ritual card")), /*#__PURE__*/React.createElement(IconButton, {
      label: "\u6536\u8D77",
      onClick: () => setCard(null)
    }, "\u2715")), /*#__PURE__*/React.createElement("div", {
      className: "card-preview"
    }, /*#__PURE__*/React.createElement(RitualCard, {
      art: card.art,
      size: "compact",
      title: card.title,
      subtitle: card.subtitle,
      quote: card.quote,
      note: card.note,
      footer: card.footer
    })), /*#__PURE__*/React.createElement("div", {
      className: "card-actions"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => {
        setCard(null);
        showToast("收下了 ✎");
      }
    }, "\u6536\u4E0B"))) : null, toast ? /*#__PURE__*/React.createElement("div", {
      className: "toast-wrap"
    }, /*#__PURE__*/React.createElement(Toast, null, toast)) : null);
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mitlesen-reader/reader-app.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.RitualCard = __ds_scope.RitualCard;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.VoiceStaff = __ds_scope.VoiceStaff;

__ds_ns.WaxDot = __ds_scope.WaxDot;

__ds_ns.WaxSeal = __ds_scope.WaxSeal;

__ds_ns.BookCard = __ds_scope.BookCard;

__ds_ns.ChapterRow = __ds_scope.ChapterRow;

__ds_ns.Highlight = __ds_scope.Highlight;

__ds_ns.MarginNote = __ds_scope.MarginNote;

__ds_ns.PersonaTag = __ds_scope.PersonaTag;

__ds_ns.ProgressRail = __ds_scope.ProgressRail;

__ds_ns.Sheet = __ds_scope.Sheet;

})();
