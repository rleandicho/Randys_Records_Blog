import Sleeve from './Sleeve.jsx';
import Vinyl from './Vinyl.jsx';
import { formatDate } from '../lib/records.js';

/**
 * One record standing face-out on a wall ledge, with a museum-style label under the ledge.
 * Hover (or tap on touch screens) slides the record halfway up out of its sleeve and spins it.
 * Clicking the sleeve or the record puts it on the turntable and opens the post.
 * The ledge itself is drawn by the shelf (.wall__shelf::before).
 */
export default function RecordSleeve({ record, isOpen, lifting, onToggle, onPick }) {
  const l = record.look;
  const style = { '--sleeve': l.sleeve, '--b1': l.band[0], '--b2': l.band[1], '--b3': l.band[2] };

  const play = (e) => {
    e.preventDefault();
    onPick(record, e.currentTarget.closest('.rec'));
  };

  const onSleeve = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
    e.preventDefault();
    // Touch screens have no hover: the first tap pulls the record up, the second plays it.
    if (!window.matchMedia('(hover: hover)').matches && !isOpen) return onToggle(record.slug);
    play(e);
  };

  return (
    <li className={`rec${isOpen ? ' is-open' : ''}${lifting ? ' is-lifting' : ''}`} style={style} data-slug={record.slug}>
      <a href={`#/record/${record.slug}`} className="rec__stage" onClick={onSleeve} aria-label={`${record.title}. ${record.description}`}>
        <div className="rec__lean">
          <div className="rec__vinyl">
            <Vinyl record={record} />
          </div>
          <Sleeve record={record} className="rec__sleeve" />
        </div>
      </a>

      {/* a museum wall label */}
      <div className="rec__card">
        <p className="rec__name">
          <i>{record.title}</i>
        </p>
        <p className="rec__medium">
          {record.catalog}, {record.minutes} min read{record.draft && ' (draft)'}
        </p>
        <p className="rec__credit">{record.description}</p>
        <p className="rec__credit">
          {formatDate(record.date)}
        </p>
      </div>
    </li>
  );
}
