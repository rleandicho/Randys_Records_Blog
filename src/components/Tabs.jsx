import { Link } from 'react-router-dom';

const TABS = [
  { id: 'records', label: 'All records', to: '/' },
  { id: 'contact', label: 'Contact me', to: '/contact' },
];

/** The chunky tab row under the masthead. */
export default function Tabs({ active }) {
  return (
    <nav className="dividers" aria-label="Site">
      {TABS.map((t) => (
        <Link
          key={t.id}
          to={t.to}
          viewTransition
          className={`divider${active === t.id ? ' is-active' : ''}`}
          aria-current={active === t.id ? 'page' : undefined}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
