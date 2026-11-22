import { Link } from 'react-router-dom';

/** The magazine-cover masthead. `small` is the compact version for post pages. */
export default function Masthead({ small = false }) {
  if (small) {
    return (
      <Link to="/" className="masthead masthead--small" viewTransition aria-label="Randy's Records — home">
        <span className="masthead__name">
          Randy's <em>Records</em>
        </span>
      </Link>
    );
  }
  return (
    <Link to="/" className="masthead" viewTransition aria-label="Randy's Records — home">
      <span className="masthead__name">
        Randy's
        <br />
        <em>Records</em>
      </span>
    </Link>
  );
}
