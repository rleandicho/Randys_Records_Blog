import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Masthead from '../components/Masthead.jsx';
import Turntable from '../components/Turntable.jsx';
import DeskComputer from '../components/DeskComputer.jsx';
import RecordSleeve from '../components/RecordSleeve.jsx';
import Tabs from '../components/Tabs.jsx';
import { records } from '../lib/records.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Three records per shelf on wide screens, two on phones.
const NARROW = '(max-width: 640px)';
function useShelfColumns() {
  const [cols, setCols] = useState(() => (window.matchMedia(NARROW).matches ? 2 : 3));
  useEffect(() => {
    const mq = window.matchMedia(NARROW);
    const on = () => setCols(mq.matches ? 2 : 3);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return cols;
}

export default function Home() {
  const navigate = useNavigate();
  const deckRef = useRef(null);
  const busy = useRef(false);
  const [openSlug, setOpenSlug] = useState(null); // record pulled by a tap (touch) or by PLAY
  const [lifting, setLifting] = useState(null);
  const [onPlatter, setOnPlatter] = useState(null);
  const [playing, setPlaying] = useState(false);
  const cols = useShelfColumns();
  const shelves = [];
  for (let i = 0; i < records.length; i += cols) shelves.push(records.slice(i, i + cols));

  const open = (record) => navigate(`/record/${record.slug}`, { viewTransition: true, state: { fromWall: true } });

  // Slide the record out of its sleeve, fly it onto the platter, drop the arm, then open the post.
  async function pick(record, recEl) {
    if (busy.current) return open(record); // second click = skip the animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return open(record);
    busy.current = true;

    const wasOut = openSlug === record.slug || recEl.matches(':hover');
    setOpenSlug(record.slug);
    await wait(wasOut ? 250 : 700); // let the record slide up out of its sleeve

    setPlaying(false);
    setOnPlatter(null);

    const src = recEl.querySelector('.rec__vinyl .vinyl');
    const from = src.getBoundingClientRect();
    const clone = src.cloneNode(true);
    setLifting(record.slug);

    const deck = deckRef.current;
    deck.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await wait(520);

    const slot = deck.querySelector('.turntable__slot');
    const to = slot.getBoundingClientRect();
    const moved = src.getBoundingClientRect().top - from.top; // `from` was measured before scrolling
    clone.classList.add('vinyl--flying');
    Object.assign(clone.style, { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px` });
    document.body.appendChild(clone);

    const s = from.width / to.width;
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + moved + from.height / 2 - (to.top + to.height / 2);
    await clone.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(0deg)`, filter: 'drop-shadow(0 8px 10px rgba(0,0,0,.45))' },
        { transform: `translate(${dx * 0.4}px, ${dy * 0.4 - 40}px) scale(${(s + 1) / 2 + 0.12}) rotate(-120deg)`, filter: 'drop-shadow(0 30px 24px rgba(0,0,0,.45))', offset: 0.55 },
        { transform: 'translate(0, -6px) scale(1.04) rotate(-200deg)', filter: 'drop-shadow(0 10px 8px rgba(0,0,0,.4))', offset: 0.85 },
        { transform: 'translate(0, 0) scale(1) rotate(-220deg)', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.4))' },
      ],
      { duration: 950, easing: 'cubic-bezier(.5,.05,.25,1)', fill: 'forwards' },
    ).finished;

    setOnPlatter(record);
    requestAnimationFrame(() => clone.remove());
    await wait(250);
    setPlaying(true); // platter spins up, arm swings over and drops
    await wait(1500);
    busy.current = false;
    setLifting(null);
    open(record);
  }

  // PLAY on an empty turntable plays the first record on the wall.
  function playFirst() {
    const first = records[0];
    const el = first && document.querySelector(`.rec[data-slug="${first.slug}"]`);
    if (el) pick(first, el);
    else if (first) open(first);
  }

  const toggle = (slug) => setOpenSlug((s) => (s === slug ? null : slug));

  return (
    <div className="store">
      <header className="cover">
        <div className="cover__issue mono">
          <span>Built with React + Vite</span>
          <span>HTML · CSS · JavaScript</span>
          <span>Posts in Markdown</span>
        </div>
        <Masthead />
        <p className="cover__tagline">Blog posts about my life in tech, works in progress, and current learnings</p>
        <span className="cover__stripe" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <Tabs active="records" />
      </header>

      <section className="desk" aria-label="Randy's desk">
        <div className="desk__top">
          <div className="desk__left">
            <Turntable ref={deckRef} record={onPlatter} playing={playing} onPlay={onPlatter ? () => setPlaying(true) : playFirst} onStop={() => setPlaying(false)} />
          </div>
          <div className="desk__right">
            <DeskComputer />
          </div>
        </div>
        <p className="desk__now mono" aria-live="polite">
          {onPlatter ? (
            <>
              <span className="dot on" /> Now playing · {onPlatter.title}
            </>
          ) : (
            'Pick a record off the wall, or press play.'
          )}
        </p>
      </section>

      <section className="wall" aria-label="Records">
        {records.length ? (
          shelves.map((row, i) => (
            <ul className="wall__shelf" key={i} style={{ '--cols': cols }}>
              {row.map((r) => (
                <RecordSleeve
                  key={r.slug}
                  record={r}
                  isOpen={openSlug === r.slug}
                  lifting={lifting === r.slug}
                  onToggle={toggle}
                  onPick={pick}
                />
              ))}
            </ul>
          ))
        ) : (
          <p className="wall__empty mono">No records up here yet.</p>
        )}
      </section>
    </div>
  );
}
