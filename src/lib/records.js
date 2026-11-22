import { marked } from 'marked';
import { parseFrontmatter } from './frontmatter.js';

// Every .md file in src/posts becomes a record. The filename is the URL slug.
// src/posts/private/ is ignored by git, so those files never leave your computer.
// They only show up while running `npm run dev`, and are never in the live build.
const files = {
  ...import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true }),
  ...(import.meta.env.DEV ? import.meta.glob('../posts/private/*.md', { query: '?raw', import: 'default', eager: true }) : {}),
};

// Record looks, picked per post from its filename.
// Override with `color:` (sleeve color), `band:` (three-color set) and `art:` in front matter.
const SLEEVES = ['#2b2824', '#efe4cc', '#d9402b', '#2c6fb3', '#d6d2c6', '#3e9b5f', '#2b2f6b'];
export const ARTS = ['stripes', 'sunrise', 'rings', 'dots', 'bars'];
export const BANDS = {
  sunset: ['#d9402b', '#f08a24', '#f2c230'],
  ocean: ['#2c6fb3', '#f2c230', '#2c6fb3'],
  lime: ['#306230', '#9bbc0f', '#306230'],
  berry: ['#a2245a', '#f4a6b8', '#a2245a'],
  night: ['#1d1b18', '#f08a24', '#1d1b18'],
};
const BAND_NAMES = Object.keys(BANDS);

/** Label text: `short` from front matter, else the title trimmed at a word boundary. */
function shorten(title, max = 40) {
  if (title.length <= max) return title;
  const cut = title.slice(0, max).replace(/\s+\S*$/, '');
  return `${cut}…`;
}

/** True for light colors, so text on them should be dark. Takes #rrggbb. */
function isLight(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function slugify(text) {
  return text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

function render(body) {
  // Give every h2 an id so the tracklist can link to it.
  const tracks = [];
  const renderer = new marked.Renderer();
  const baseHeading = renderer.heading.bind(renderer);
  renderer.heading = function (token) {
    if (token.depth === 2) {
      const text = token.text;
      const id = slugify(text);
      tracks.push({ id, title: text.replace(/[*_`]/g, '') });
      return `<h2 id="${id}">${this.parser.parseInline(token.tokens)}</h2>\n`;
    }
    return baseHeading(token);
  };
  const html = marked.parse(body, { renderer, gfm: true });
  return { html, tracks };
}

const DRAFTS_VISIBLE = import.meta.env.DEV;

const parsed = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(raw);
    const h = hash(slug);
    const sleeve = data.color ?? data.shell ?? SLEEVES[h % SLEEVES.length];
    const words = body.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 220));
    const { html, tracks } = render(body);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ? new Date(data.date) : new Date(0),
      tags: data.tags ?? [],
      label: data.label ?? '',
      status: data.status ?? '',
      draft: data.draft === true,
      short: data.short ?? shorten(data.title ?? slug),
      look: {
        sleeve,
        sleeveInk: isLight(sleeve) ? '#1d1b18' : '#fbf6ea',
        band: BANDS[data.band] ?? BANDS[BAND_NAMES[(h >>> 4) % BAND_NAMES.length]],
        art: ARTS.includes(data.art) ? data.art : ARTS[(h >>> 9) % ARTS.length],
      },
      minutes,
      runtime: `${minutes}:00`,
      html,
      tracks,
    };
  })
  .filter((r) => DRAFTS_VISIBLE || !r.draft);

// Catalog numbers go oldest → newest; the wall shows newest first.
parsed.sort((a, b) => a.date - b.date).forEach((r, i) => (r.catalog = `RR-${String(i + 1).padStart(3, '0')}`));

export const records = [...parsed].reverse();
export const getRecord = (slug) => records.find((r) => r.slug === slug);

export function formatDate(d) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
