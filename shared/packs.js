// Draws product packshots as inline SVG, so invented brands get consistent "photos"
// without stock images. Every shape shares one 200x240 frame resting on y=222.
(function (root) {
  "use strict";

  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );

  // Shrinks the label so long names still fit the pack face.
  function labelSize(text, width, max) {
    const len = Math.max(String(text).length, 1);
    return Math.min(max, Math.round((width / len) * 1.7));
  }

  function label(a, cx, y, width, opts = {}) {
    const main = a.label || "";
    const size = labelSize(main, width, opts.max || 26);
    const ink = a.ink || "#111";
    const sub = a.sub
      ? `<text x="${cx}" y="${y + size * 0.55 + 14}" text-anchor="middle" font-size="${opts.subSize || 10}" font-weight="600" fill="${ink}" opacity=".78" style="font-family:var(--font-body,system-ui);letter-spacing:.02em">${esc(a.sub)}</text>`
      : "";
    return `<text x="${cx}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="800" fill="${ink}" style="font-family:var(--font-display,system-ui);letter-spacing:-.01em">${esc(main)}</text>${sub}`;
  }

  const shadow =
    '<ellipse cx="100" cy="224" rx="62" ry="7" fill="#000" opacity=".14"/>';
  const gloss = (x, y, w, h, r = 6) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#fff" opacity=".22"/>`;

  const shapes = {
    jar(a) {
      return `${shadow}
        <rect x="58" y="34" width="84" height="30" rx="7" fill="${a.lid || a.ink || "#222"}"/>
        <rect x="58" y="56" width="84" height="5" fill="#000" opacity=".15"/>
        <rect x="50" y="62" width="100" height="160" rx="20" fill="${a.body}"/>
        <rect x="50" y="98" width="100" height="84" fill="${a.accent}"/>
        ${gloss(60, 70, 9, 140, 5)}
        ${label(a, 100, 140, 84)}`;
    },
    sachet(a) {
      const zig = (y, dir) => {
        let d = `M48 ${y}`;
        for (let x = 48; x < 152; x += 8)
          d += ` L${x + 4} ${y + dir * 5} L${x + 8} ${y}`;
        return d;
      };
      return `${shadow}
        <path d="M48 34 H152 V214 H48 Z" fill="${a.body}"/>
        <path d="${zig(34, -1)} V48 H48 Z" fill="${a.body}"/>
        <path d="${zig(214, 1)} V200 H48 Z" fill="${a.body}"/>
        <rect x="48" y="34" width="104" height="16" fill="#000" opacity=".1"/>
        <rect x="48" y="198" width="104" height="16" fill="#000" opacity=".1"/>
        <circle cx="140" cy="42" r="3" fill="#fff" opacity=".7"/>
        <rect x="48" y="96" width="104" height="70" fill="${a.accent}"/>
        ${gloss(56, 56, 7, 136, 4)}
        ${label(a, 100, 134, 86, { max: 24 })}`;
    },
    pouch(a) {
      return `${shadow}
        <path d="M56 30 H144 L152 206 Q152 222 136 222 H64 Q48 222 48 206 Z" fill="${a.body}"/>
        <rect x="56" y="30" width="88" height="10" fill="#000" opacity=".12"/>
        <line x1="58" y1="52" x2="142" y2="52" stroke="#000" stroke-opacity=".18" stroke-width="2" stroke-dasharray="4 3"/>
        <path d="M51 104 H149 L150.5 176 H49.5 Z" fill="${a.accent}"/>
        ${gloss(60, 62, 8, 140, 4)}
        ${label(a, 100, 144, 88)}`;
    },
    dropper(a) {
      return `${shadow}
        <rect x="88" y="20" width="24" height="30" rx="12" fill="${a.lid || "#1b1b1b"}"/>
        <rect x="80" y="48" width="40" height="22" rx="4" fill="${a.lid || "#1b1b1b"}"/>
        <path d="M84 70 H116 V84 Q146 92 146 120 V206 Q146 222 130 222 H70 Q54 222 54 206 V120 Q54 92 84 84 Z" fill="${a.body}"/>
        <rect x="58" y="122" width="84" height="72" rx="4" fill="${a.accent}"/>
        ${gloss(64, 100, 8, 108, 4)}
        ${label(a, 100, 160, 74, { max: 22 })}`;
    },
    bottle(a) {
      return `${shadow}
        <rect x="84" y="24" width="32" height="22" rx="4" fill="${a.lid || "#1b1b1b"}"/>
        <path d="M88 46 H112 V64 Q148 76 148 112 V206 Q148 222 132 222 H68 Q52 222 52 206 V112 Q52 76 88 64 Z" fill="${a.body}"/>
        <rect x="52" y="118" width="96" height="76" fill="${a.accent}"/>
        ${gloss(62, 92, 8, 116, 4)}
        ${label(a, 100, 158, 84)}`;
    },
    spray(a) {
      return `${shadow}
        <path d="M78 26 H134 Q142 26 142 34 V44 H120 L104 64 H82 Z" fill="${a.lid || "#1b1b1b"}"/>
        <path d="M128 44 L150 60 L146 66 L124 52 Z" fill="${a.lid || "#1b1b1b"}"/>
        <rect x="84" y="62" width="26" height="20" fill="${a.lid || "#1b1b1b"}" opacity=".85"/>
        <path d="M80 82 H114 Q142 94 142 124 V208 Q142 222 128 222 H70 Q56 222 56 208 V112 Q56 88 80 82 Z" fill="${a.body}"/>
        <rect x="56" y="126" width="86" height="70" fill="${a.accent}"/>
        ${gloss(64, 100, 8, 108, 4)}
        ${label(a, 99, 164, 76, { max: 22 })}`;
    },
    can(a) {
      return `${shadow}
        <path d="M60 40 Q60 30 100 30 Q140 30 140 40 V212 Q140 222 100 222 Q60 222 60 212 Z" fill="${a.body}"/>
        <ellipse cx="100" cy="38" rx="40" ry="8" fill="#000" opacity=".16"/>
        <rect x="60" y="100" width="80" height="74" fill="${a.accent}"/>
        ${gloss(68, 50, 8, 160, 4)}
        ${label(a, 100, 140, 70, { max: 22 })}`;
    },
    box(a) {
      return `${shadow}
        <path d="M46 52 L68 34 H160 L138 52 Z" fill="${a.body}"/>
        <path d="M46 52 L68 34 H160 L138 52 Z" fill="#fff" opacity=".25"/>
        <path d="M138 52 L160 34 V200 L138 220 Z" fill="${a.body}"/>
        <path d="M138 52 L160 34 V200 L138 220 Z" fill="#000" opacity=".2"/>
        <rect x="46" y="52" width="92" height="168" fill="${a.body}"/>
        <rect x="46" y="104" width="92" height="72" fill="${a.accent}"/>
        ${label(a, 92, 144, 80, { max: 22 })}`;
    },
    tub(a) {
      return `${shadow}
        <rect x="40" y="86" width="120" height="22" rx="8" fill="${a.lid || a.ink || "#222"}"/>
        <path d="M44 108 H156 L150 212 Q149 222 138 222 H62 Q51 222 50 212 Z" fill="${a.body}"/>
        <rect x="47" y="134" width="106" height="60" fill="${a.accent}"/>
        ${gloss(56, 116, 8, 94, 4)}
        ${label(a, 100, 168, 96)}`;
    },
  };

  // art: { shape, body, accent, ink, lid, label, sub }
  function pack(art, title) {
    const draw = shapes[art.shape] || shapes.jar;
    return `<svg class="pack" viewBox="0 0 200 240" role="img" aria-label="${esc(title || art.label)}" xmlns="http://www.w3.org/2000/svg">${draw(art)}</svg>`;
  }

  const api = { pack, shapes: Object.keys(shapes) };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Packs = api;
})(typeof window !== "undefined" ? window : globalThis);
