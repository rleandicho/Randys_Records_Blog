import { forwardRef } from 'react';
import Vinyl from './Vinyl.jsx';

/**
 * A belt-drive turntable seen from above: gloss black plinth, silver-rimmed
 * platter with a felt mat, a straight tonearm on the right and four buttons
 * along the front. Real size is 450 × 368 mm; it is laid out in container units
 * (100cqi = 450 mm) so every
 * part lines up at any size.
 *  - record:  the record on the platter (or null)
 *  - playing: platter spinning, tonearm down on the record
 */
const Turntable = forwardRef(function Turntable({ record, playing, onPlay, onStop, className = '' }, ref) {
  const toggle = playing ? onStop : onPlay;
  return (
    <div ref={ref} className={`turntable${playing ? ' is-playing' : ''}${record ? ' is-loaded' : ''} ${className}`}>
      <span className="turntable__hinge turntable__hinge--l" aria-hidden="true" />
      <span className="turntable__hinge turntable__hinge--r" aria-hidden="true" />

      <div className="turntable__platter" aria-hidden="true">
        <div className={`turntable__mat${playing ? ' is-spinning' : ''}`} />
      </div>
      <div className="turntable__slot">{record && <Vinyl record={record} spinning={playing} />}</div>
      <span className="turntable__spindle" aria-hidden="true" />

      {/* The arm is drawn around a pivot at (86, 18); this viewBox scales it to a real
          223 mm arm and moves the pivot to 82cqi × 20cqi on the plinth. */}
      <svg className="turntable__arm" viewBox="18.79 1.61 81.97 67.05" aria-hidden="true">
        <defs>
          <linearGradient id="tt-tube" x1="0" x2="1">
            <stop offset="0" stopColor="#8d8f93" />
            <stop offset="0.45" stopColor="#f4f4f4" />
            <stop offset="1" stopColor="#9a9ca0" />
          </linearGradient>
          <linearGradient id="tt-weight" x1="0" x2="1">
            <stop offset="0" stopColor="#0e0e10" />
            <stop offset="0.4" stopColor="#3a3b3f" />
            <stop offset="1" stopColor="#111113" />
          </linearGradient>
          <radialGradient id="tt-base" cx="0.4" cy="0.35">
            <stop offset="0" stopColor="#3b3c40" />
            <stop offset="1" stopColor="#141416" />
          </radialGradient>
        </defs>

        {/* arm rest with its clip */}
        <rect x="83.6" y="44.6" width="4.8" height="3.6" rx="0.8" className="arm-rest" />
        <path d="M88.4 45.4 h2.2 v2 h-2.2" className="arm-clip" />

        {/* anti-skate dial */}
        <circle cx="92.8" cy="34" r="2.1" className="arm-dial" />
        <path d="M92.8 32.2 v1.1" className="arm-dial-tick" />

        {/* cue lever */}
        <rect x="91.2" y="22.6" width="3.2" height="5.6" rx="0.8" className="arm-cue-base" />
        <path d="M92.8 24 L96 19.6" className="arm-cue" />

        {/* the base the arm pivots on */}
        <circle cx="86" cy="18" r="7.2" fill="url(#tt-base)" className="arm-base" />
        <circle cx="86" cy="18" r="5.4" className="arm-ring" />

        <g className="arm">
          {/* counterweight, knurled, with a scale ring */}
          <rect x="82.3" y="4.4" width="7.4" height="7" rx="1.2" fill="url(#tt-weight)" />
          <path d="M82.5 5.4 h7 M82.5 6.3 h7 M82.5 7.2 h7 M82.5 8.1 h7" className="arm-knurl" />
          <rect x="82.1" y="9.2" width="7.8" height="1" rx="0.3" className="arm-scale" />
          <rect x="85.4" y="11.2" width="1.2" height="2" className="arm-stub" />
          {/* gimbal */}
          <rect x="83" y="16.2" width="6" height="3.6" rx="0.8" className="arm-gimbal" />
          {/* arm tube */}
          <rect x="85.3" y="12" width="1.4" height="39" rx="0.7" fill="url(#tt-tube)" />
          <rect x="85.05" y="48.6" width="1.9" height="2" rx="0.4" className="arm-collar" />
          {/* headshell with finger lift and cartridge, offset like a real one */}
          <g transform="rotate(22 86 50.6)">
            <path d="M84.4 50.4 h3.2 l0.5 7.8 h-4.2 z" className="arm-head" />
            <path d="M87.9 52.2 q2.6 0.2 3.2 1.9" className="arm-lift" />
            <rect x="84.5" y="54.2" width="3.2" height="3.6" rx="0.3" className="arm-cart" />
            <circle cx="85.1" cy="53.2" r="0.3" className="arm-screw" />
            <circle cx="87.1" cy="53.2" r="0.3" className="arm-screw" />
            <rect x="85.7" y="57.6" width="0.8" height="0.7" className="arm-stylus" />
          </g>
        </g>
        <circle cx="86" cy="18" r="1.6" className="arm-pivot" />
      </svg>

      <div className="turntable__keys">
        <span className="tt-key" aria-hidden="true">
          <i />
          <small>33 / 45</small>
        </span>
        <span className="tt-key" aria-hidden="true">
          <i />
          <small>Auto</small>
        </span>
        <button type="button" className="tt-key tt-key--play" onClick={toggle} disabled={!toggle} aria-label={playing ? 'Stop the record' : 'Play a record'} title={playing ? 'Stop' : 'Play'}>
          <i />
          <small>Play / Stop</small>
        </button>
        <span className="tt-key" aria-hidden="true">
          <i />
          <small>Source</small>
        </span>
        <span className={`turntable__led${playing ? ' on' : ''}`} aria-hidden="true" />
      </div>
      <span className="turntable__print" aria-hidden="true">
        Randy's Records · Belt drive
      </span>
    </div>
  );
});

export default Turntable;
