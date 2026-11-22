import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import RecordPage from './pages/RecordPage.jsx';
import NotFound from './pages/NotFound.jsx';
import Contact from './pages/Contact.jsx';
import './styles.css';
import './records.css';

// Hash routing keeps every URL working on GitHub Pages with no server config.
const router = createHashRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/record/:slug', element: <RecordPage /> },
      { path: '/contact', element: <Contact /> },
      { path: '/tape/:slug', element: <RecordPage /> }, // links from the tape version
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
