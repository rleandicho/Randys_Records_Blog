/**
 * The right half of the desk, seen straight from above: a monitor on its stand,
 * a tenkeyless keyboard with floating keys, an OLED and a metal roller, a wrist rest,
 * a wireless mouse, all on a plain black desk mat.
 * Drawn to scale on a 140 × 100 grid where 1 unit = 5.5 mm (770 × 550 mm of desk),
 * the same scale as the turntable next to it.
 */

const U = 3.4; // one key unit (19 mm); the keyboard comes out at ~355 mm wide
const KB = { x: 22, y: 52 }; // keyboard top-left corner
const PAD = 0.4; // plate border, in key units
const TOP = 1.3; // strip above the function row for the OLED, in key units

// Rows of [label, width in units]. `null` labels are gaps.
const FN_ROW = [['Esc', 1], [null, 1], ['F1', 1], ['F2', 1], ['F3', 1], ['F4', 1], [null, 0.5], ['F5', 1], ['F6', 1], ['F7', 1], ['F8', 1], [null, 0.5], ['F9', 1], ['F10', 1], ['F11', 1], ['F12', 1]];
const MAIN = [
  [['`', 1], ['1', 1], ['2', 1], ['3', 1], ['4', 1], ['5', 1], ['6', 1], ['7', 1], ['8', 1], ['9', 1], ['0', 1], ['-', 1], ['=', 1], ['Back', 2]],
  [['Tab', 1.5], ['Q', 1], ['W', 1], ['E', 1], ['R', 1], ['T', 1], ['Y', 1], ['U', 1], ['I', 1], ['O', 1], ['P', 1], ['[', 1], [']', 1], ['\\', 1.5]],
  [['Caps', 1.75], ['A', 1], ['S', 1], ['D', 1], ['F', 1], ['G', 1], ['H', 1], ['J', 1], ['K', 1], ['L', 1], [';', 1], ["'", 1], ['Enter', 2.25]],
  [['Shift', 2.25], ['Z', 1], ['X', 1], ['C', 1], ['V', 1], ['B', 1], ['N', 1], ['M', 1], [',', 1], ['.', 1], ['/', 1], ['Shift', 2.75]],
  [['Ctrl', 1.25], ['', 1.25], ['Alt', 1.25], ['', 6.25], ['Alt', 1.25], ['Fn', 1.25], ['', 1.25], ['Ctrl', 1.25]],
];
// The navigation cluster: [label, column, row] with rows counted from the function row (0).
const NAV = [
  ['Ins', 0, 1.5], ['Home', 1, 1.5], ['PgUp', 2, 1.5],
  ['Del', 0, 2.5], ['End', 1, 2.5], ['PgDn', 2, 2.5],
  ['↑', 1, 4.5],
  ['←', 0, 5.5], ['↓', 1, 5.5], ['→', 2, 5.5],
];
const NAV_X = 15.25;

function keys() {
  const out = [];
  const add = (label, ux, uy, uw, i) => {
    const x = KB.x + (PAD + ux) * U;
    const y = KB.y + (PAD + TOP + uy) * U;
    out.push({ key: i, label, x, y, w: uw * U });
  };
  let ux = 0;
  FN_ROW.forEach(([l, w], i) => {
    if (l) add(l, ux, 0, w, `f${i}`);
    ux += w;
  });
  MAIN.forEach((row, r) => {
    let x = 0;
    row.forEach(([l, w], i) => {
      add(l, x, 1.5 + r, w, `m${r}-${i}`);
      x += w;
    });
  });
  NAV.forEach(([l, c, r], i) => add(l, NAV_X + c, r, 1, `n${i}`));
  return out;
}

const KEYS = keys();
const KB_W = (PAD * 2 + NAV_X + 3) * U;
const KB_H = (PAD * 2 + TOP + 6.5) * U;

function Keyboard() {
  const oledX = KB.x + (PAD + NAV_X) * U;
  const oledY = KB.y + PAD * U * 0.9;
  return (
    <g>
      {/* braided cable out the back */}
      {/* aluminium top plate */}
      <rect x={KB.x} y={KB.y} width={KB_W} height={KB_H} rx="1.6" className="kb-plate" filter="url(#pc-shadow)" />
      <rect x={KB.x + 0.3} y={KB.y + 0.3} width={KB_W - 0.6} height={KB_H - 0.6} rx="1.3" className="kb-bevel" />
      {/* RGB glow between the keys */}
      <g filter="url(#pc-blur)" className="kb-glow">
        {KEYS.map((k) => (
          <rect key={k.key} x={k.x - 0.1} y={k.y - 0.1} width={k.w + 0.2} height={U + 0.2} rx="0.6" fill="url(#pc-rgb)" />
        ))}
      </g>
      {KEYS.map((k) => (
        <g key={k.key}>
          <rect x={k.x + 0.25} y={k.y + 0.25} width={k.w - 0.5} height={U - 0.5} rx="0.55" className="cap" />
          <rect x={k.x + 0.75} y={k.y + 0.55} width={k.w - 1.5} height={U - 1.5} rx="0.45" className="cap-top" />
          {k.label && (
            <text x={k.x + 0.9} y={k.y + 1.6} className={`legend${k.label.length > 2 ? ' legend--sm' : ''}`}>
              {k.label}
            </text>
          )}
        </g>
      ))}
      {/* OLED and the metal roller in the top-right corner */}
      <rect x={oledX + 0.2} y={oledY} width={2 * U - 0.6} height={TOP * U - 0.4} rx="0.3" className="oled" />
      <text x={oledX + 0.8} y={oledY + 2} className="oled-text">
        RR-REC
      </text>
      <rect x={oledX + 2 * U + 0.2} y={oledY + 0.2} width={U - 1.2} height={TOP * U - 0.8} rx="0.4" className="roller" />
      <path d={Array.from({ length: 7 }, (_, i) => `M${oledX + 2 * U + 0.6 + i * 0.36} ${oledY + 0.4} v${TOP * U - 1.2}`).join(' ')} className="roller-knurl" />
    </g>
  );
}

function Mouse() {
  // A wireless right-handed mouse, nose pointing at the monitor.
  return (
    <g transform="translate(110 67) rotate(4) scale(1.07)" filter="url(#pc-shadow)">
      <path d="M0 -10 C4.6 -10 6 -5.4 6 0.6 C6 6.8 4 10.4 -0.4 10.4 C-4.6 10.4 -6.2 7 -6.2 1.2 C-6.2 -5.2 -4.6 -10 0 -10 Z" className="mouse" />
      <path d="M0 -10 C4.6 -10 6 -5.4 6 0.6 C6 6.8 4 10.4 -0.4 10.4 C-4.6 10.4 -6.2 7 -6.2 1.2 C-6.2 -5.2 -4.6 -10 0 -10 Z" className="mouse-sheen" />
      <path d="M-0.1 -9.9 V-2.2 M-5.6 -2.6 C-3 -1.6 3 -1.6 5.6 -2.6" className="mouse-seam" />
      <rect x="-0.75" y="-7.6" width="1.5" height="3.6" rx="0.7" className="mouse-wheel" />
      <path d="M-0.75 -7 h1.5 M-0.75 -6.2 h1.5 M-0.75 -5.4 h1.5 M-0.75 -4.6 h1.5" className="mouse-wheel-grip" />
      <path d="M-6.05 -0.4 v2.4 M-6.1 2.8 v2.4" className="mouse-side" />
      <circle cx="0" cy="-1" r="0.35" className="mouse-led" />
    </g>
  );
}

export default function DeskComputer() {
  return (
    <svg className="pc" viewBox="0 0 140 100" role="img" aria-label="A computer setup on the desk: monitor, keyboard and wireless mouse">
      <defs>
        <filter id="pc-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0.3" dy="1.2" stdDeviation="0.8" floodColor="#000" floodOpacity="0.55" />
        </filter>
        <filter id="pc-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.45" />
        </filter>
        <linearGradient id="pc-rgb" gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="92" y2="0">
          <stop offset="0" stopColor="#d9402b" />
          <stop offset="0.5" stopColor="#f08a24" />
          <stop offset="1" stopColor="#f2c230" />
        </linearGradient>
        <radialGradient id="pc-spill">
          <stop offset="0" stopColor="#cfe3ff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#cfe3ff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="pc-front">
          <rect x="0" y="16.6" width="140" height="84" />
        </clipPath>
        <linearGradient id="pc-mat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#17171a" />
          <stop offset="1" stopColor="#0d0d0f" />
        </linearGradient>
        <radialGradient id="pc-mouse-hi" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pc-base" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a2b2f" />
          <stop offset="0.5" stopColor="#3a3b40" />
          <stop offset="1" stopColor="#2a2b2f" />
        </linearGradient>
      </defs>

      {/* sticky notes on the desk */}
      <g transform="rotate(-7 10 26)" filter="url(#pc-shadow)">
        <rect x="2" y="20" width="13.8" height="13.8" className="note note--orange" />
        <path d="M4.4 25 h8.4 M4.4 28.2 h5.6" className="scribble" />
      </g>
      <g transform="rotate(6 128 18)" filter="url(#pc-shadow)">
        <rect x="122" y="12" width="13.8" height="13.8" className="note" />
        <path d="M124.6 16.6 h8.6 M124.6 19.6 h6 M124.6 22.6 h7.6" className="scribble" />
      </g>

      {/* plain black desk mat */}
      <rect x="6.5" y="40" width="127" height="55" rx="2.6" fill="url(#pc-mat)" className="mat" filter="url(#pc-shadow)" />

      {/* light from the screen falling on the desk in front of it */}
      <path d={`M${KB.x + 5 * U} ${KB.y} C ${KB.x + 5 * U} ${KB.y - 14}, 42 26, 44 11`} className="cable" />
      <ellipse cx="70" cy="16.6" rx="62" ry="30" fill="url(#pc-spill)" clipPath="url(#pc-front)" />

      {/* monitor, from straight above: stand foot, the back of the panel, the thin front edge */}
      <g filter="url(#pc-shadow)">
        <rect x="51" y="1" width="38" height="31" rx="2.6" fill="url(#pc-base)" className="mon-base" />
        <rect x="63.5" y="3" width="13" height="10" rx="1.2" className="mon-neck" />
        <path d="M67 3 C67 0 74 0 74 -2" className="cable" />
        <path d="M38 9 H102 L106 14 H34 Z" className="mon-back" />
        <rect x="14.4" y="14" width="111.2" height="2.6" rx="0.6" className="mon-panel" />
        <rect x="15" y="16" width="110" height="0.6" rx="0.3" className="mon-lit" />
        <rect x="68" y="16.6" width="4" height="0.45" rx="0.2" className="mon-led" />
      </g>

      <Keyboard />

      {/* wrist rest */}
      <rect x={KB.x + 0.6} y={KB.y + KB_H + 2.4} width={15.8 * U} height="7.2" rx="3" className="wrist" filter="url(#pc-shadow)" />

      <Mouse />
    </svg>
  );
}
