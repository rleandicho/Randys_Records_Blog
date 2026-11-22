/**
 * A record sleeve: generated cover art in the sleeve color and the post's
 * three-color band, with a title sticker in the corner. Square, any size.
 */
export default function Sleeve({ record, className = '' }) {
  const { sleeve, sleeveInk } = record.look;
  const style = { '--sleeve': sleeve, '--sleeve-ink': sleeveInk };
  return (
    <div className={`sleeve ${className}`} style={style}>
      <SleeveArt record={record} className="sleeve__art" />
      <span className="sleeve__sticker">
        <span className="sleeve__cat">
          <span>{record.catalog}</span>
          <span className="sleeve__year">{record.date.getUTCFullYear()}</span>
        </span>
        <span className="sleeve__title" style={{ '--len': Math.max(record.short.length, 12) }}>
          {record.short}
        </span>
      </span>
      <span className="sleeve__wear" aria-hidden="true" />
    </div>
  );
}

/** Just the cover art, as a square SVG. Also printed on the record's center sticker. */
export function SleeveArt({ record, className = '' }) {
  const { sleeve, sleeveInk, band, art } = record.look;
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="100" height="100" fill={sleeve} />
      <Art art={art} b={band} ink={sleeveInk} />
    </svg>
  );
}

function Art({ art, b, ink }) {
  switch (art) {
    case 'sunrise':
      return (
        <g>
          {[46, 36, 26].map((r, i) => (
            <circle key={r} cx="50" cy="100" r={r} fill={b[i]} />
          ))}
          {Array.from({ length: 7 }, (_, i) => {
            const a = Math.PI + ((i + 0.5) / 7) * Math.PI;
            return <line key={i} x1={50 + 52 * Math.cos(a)} y1={100 + 52 * Math.sin(a)} x2={50 + 66 * Math.cos(a)} y2={100 + 66 * Math.sin(a)} stroke={ink} strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />;
          })}
        </g>
      );
    case 'rings':
      return (
        <g>
          {[40, 31, 22, 13].map((r, i) => (
            <circle key={r} cx="66" cy="66" r={r} fill={i === 3 ? ink : b[i]} />
          ))}
          <circle cx="66" cy="66" r="2.5" fill={b[0]} />
        </g>
      );
    case 'dots': {
      const dots = [];
      for (let y = 0; y < 5; y++)
        for (let x = 0; x < 6; x++) {
          const k = (x + y * 2) % 7;
          dots.push(<circle key={`${x}-${y}`} cx={14 + x * 14.5} cy={44 + y * 12} r={k < 3 ? 4.6 : 2.4} fill={k < 3 ? b[k] : ink} opacity={k < 3 ? 1 : 0.55} />);
        }
      return <g>{dots}</g>;
    }
    case 'bars':
      return (
        <g>
          {[30, 52, 40, 64, 46, 58, 34, 50].map((h, i) => (
            <rect key={i} x={10 + i * 10.4} y={94 - h} width="7" height={h} fill={b[i % 3]} />
          ))}
          <rect x="6" y="94" width="88" height="2.4" fill={ink} />
        </g>
      );
    case 'stripes':
    default:
      return (
        <g transform="rotate(-18 50 50)">
          <rect x="-30" y="50" width="160" height="10" fill={b[0]} />
          <rect x="-30" y="60" width="160" height="10" fill={b[1]} />
          <rect x="-30" y="70" width="160" height="10" fill={b[2]} />
          <rect x="-30" y="84" width="160" height="2" fill={ink} opacity="0.7" />
        </g>
      );
  }
}
