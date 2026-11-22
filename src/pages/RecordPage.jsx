import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Masthead from '../components/Masthead.jsx';
import Turntable from '../components/Turntable.jsx';
import Sleeve from '../components/Sleeve.jsx';
import { formatDate, getRecord, records } from '../lib/records.js';
import NotFound from './NotFound.jsx';

const SIDE_LABELS = ['A', 'B'];

export default function RecordPage() {
  const { slug } = useParams();
  const record = getRecord(slug);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(Boolean(state?.fromWall));

  // Arriving from a direct link: press play after a beat.
  useEffect(() => {
    if (playing) return;
    const t = setTimeout(() => setPlaying(true), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (record) document.title = `${record.title} · Randy's Records`;
    return () => (document.title = "Randy's Records");
  }, [record]);

  if (!record) return <NotFound />;

  // Lift the arm, then head back to the records.
  const back = () => {
    setPlaying(false);
    setTimeout(() => navigate('/', { viewTransition: true }), 700);
  };

  const half = Math.ceil(record.tracks.length / 2);
  const index = records.indexOf(record);
  const newer = records[index - 1];
  const older = records[index + 1];

  return (
    <div className="listening">
      <header className="listening__bar">
        <Masthead small />
        <button type="button" className="back-btn mono" onClick={back}>
          ◀ Back to the records
        </button>
      </header>

      <section className="now-playing">
        <div className="now-playing__deck">
          <Turntable record={record} playing={playing} onPlay={() => setPlaying(true)} onStop={() => setPlaying(false)} />
        </div>
        <div className="now-playing__info">
          <span className="mono eyebrow">
            <span className={`dot${playing ? ' on' : ''}`} /> {playing ? 'Now playing' : 'Stopped'} · {record.catalog}
          </span>
          <h1>{record.title}</h1>
          {record.description && <p className="lede">{record.description}</p>}
          <dl className="specs mono">
            <div>
              <dt>Released</dt>
              <dd>{formatDate(record.date)}</dd>
            </div>
            <div>
              <dt>Runtime</dt>
              <dd>{record.runtime}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Vinyl LP · 33⅓</dd>
            </div>
          </dl>
          {record.tracks.length > 0 && (
            <ol className="tracklist">
              {record.tracks.map((t, i) => (
                <li key={t.id}>
                  <button type="button" onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                    <span className="mono tracklist__no">
                      {SIDE_LABELS[i < half ? 0 : 1]}
                      {i < half ? i + 1 : i - half + 1}
                    </span>
                    <span>{t.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <article className="liner-notes">
        <div className="liner-notes__head mono">
          <span>Liner notes</span>
          <span>{record.catalog}</span>
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: record.html }} />
      </article>

      {(newer || older) && (
        <nav className="more-records" aria-label="More records">
          {[
            ['Newer record', newer],
            ['Older record', older],
          ].map(([label, r]) =>
            r ? (
              <Link key={label} to={`/record/${r.slug}`} className="more-records__item" viewTransition>
                <div className="more-records__sleeve">
                  <Sleeve record={r} />
                </div>
                <div>
                  <span className="mono">{label}</span>
                  <strong>{r.title}</strong>
                </div>
              </Link>
            ) : (
              <span key={label} />
            ),
          )}
        </nav>
      )}
    </div>
  );
}
