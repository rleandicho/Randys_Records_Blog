import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Outlet />
      <footer className="site-footer">
        <span>Randy's Records · Made at home</span>
        <span className="site-footer__stripes" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span>Page contains AI Generated Content</span>
      </footer>
      <ScrollRestoration />
    </>
  );
}
