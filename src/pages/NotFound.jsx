import { Link } from 'react-router-dom';
import Masthead from '../components/Masthead.jsx';

export default function NotFound() {
  return (
    <div className="not-found">
      <Masthead small />
      <h1>Out of stock</h1>
      <p>That record isn't on the wall. Maybe it hasn't been pressed yet.</p>
      <Link to="/" className="back-btn mono">
        ◀ Back to the records
      </Link>
    </div>
  );
}
