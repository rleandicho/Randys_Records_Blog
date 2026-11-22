import { SleeveArt } from './Sleeve.jsx';

/**
 * A vinyl record. Square, sized in container units so it scales to any width.
 * The center sticker is the album art, with the catalog number on a small strip.
 * `spinning` turns the disc; the sheen stays still so the light looks fixed.
 */
export default function Vinyl({ record, spinning = false, className = '' }) {
  const l = record?.look;
  const style = l ? { '--b1': l.band[0], '--b2': l.band[1], '--b3': l.band[2] } : undefined;
  return (
    <div className={`vinyl ${className}`} style={style}>
      <div className={`vinyl__disc${spinning ? ' is-spinning' : ''}`}>
        <div className="vinyl__label">
          {record && (
            <>
              <SleeveArt record={record} className="vinyl__art" />
              <span className="vinyl__strip">
                {record.catalog} · 33⅓
              </span>
            </>
          )}
          <span className="vinyl__hole" />
        </div>
      </div>
      <div className="vinyl__sheen" aria-hidden="true" />
    </div>
  );
}
