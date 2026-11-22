import { useEffect } from 'react';
import Masthead from '../components/Masthead.jsx';
import Tabs from '../components/Tabs.jsx';
import { contact } from '../contact.js';

export default function Contact() {
  useEffect(() => {
    document.title = "Contact · Randy's Records";
    return () => (document.title = "Randy's Records");
  }, []);

  const links = contact.links.filter((l) => l.value);

  return (
    <div className="listening contact-page">
      <header className="listening__bar">
        <Masthead small />
      </header>
      <Tabs active="contact" />

      <section className="contact">
        <span className="mono eyebrow">Side B · Get in touch</span>
        <h1>Contact me</h1>
        <p className="lede">{contact.intro}</p>

        <ul className="contact__list">
          {links.map((l, i) => (
            <li key={l.label} className="contact__item">
              <span className="contact__no mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="contact__label mono">{l.label}</span>
              {l.href ? (
                <a href={l.href(l.value)} target={l.label === 'Email' ? undefined : '_blank'} rel="noreferrer">
                  {l.value}
                </a>
              ) : (
                <span>{l.value}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
