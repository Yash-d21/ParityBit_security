import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { brandLogo } from '../content/brand';
import { footerContent } from '../content/footer';
import { subscribeNewsletter } from '../lib/newsletter';
import './SiteFooter.css';

export function SiteFooter() {
  const phoneHref = `tel:${footerContent.phone.replace(/\s/g, '')}`;
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(
    null,
  );

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFeedback(null);

    const result = await subscribeNewsletter(email);

    if (result.ok) {
      setEmail('');
      setFeedback({ tone: 'success', message: result.message });
    } else {
      setFeedback({ tone: 'error', message: result.message });
    }

    setIsSubmitting(false);
  }

  return (
    <footer className="site-footer" data-framer-name="Footer">
      <div className="site-footer__container">
        <div className="site-footer__newsletter">
          <p className="site-footer__newsletter-eyebrow">{footerContent.newsletter.eyebrow}</p>
          <h3 className="site-footer__newsletter-title">{footerContent.newsletter.title}</h3>
          <p className="site-footer__newsletter-desc">{footerContent.newsletter.description}</p>
          <form className="site-footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
            <label className="site-footer__visually-hidden" htmlFor="footer-newsletter-email">
              Work email
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={footerContent.newsletter.placeholder}
              className="site-footer__newsletter-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="site-footer__newsletter-button"
              disabled={isSubmitting}
            >
              {footerContent.newsletter.buttonLabel}
            </button>
          </form>
          {feedback ? (
            <p
              className="site-footer__newsletter-desc"
              role="status"
              aria-live="polite"
              data-newsletter-feedback={feedback.tone}
            >
              {feedback.message}
            </p>
          ) : null}
        </div>

        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo" aria-label="ParityBit Security home">
              <img
                src={brandLogo.src}
                alt={brandLogo.alt}
                width={brandLogo.width}
                height={brandLogo.height}
              />
            </Link>
            <p className="site-footer__brand-name">{footerContent.brand}</p>
            <p className="site-footer__tagline">{footerContent.tagline}</p>

            <div className="site-footer__contact">
              <a href={phoneHref}>{footerContent.phone}</a>
              <a href={`mailto:${footerContent.email}`}>{footerContent.email}</a>
              <span>{footerContent.location}</span>
              <span className="site-footer__soc">{footerContent.socStatus}</span>
            </div>
          </div>

          <div className="site-footer__columns">
            {footerContent.columns.map((column) => (
              <div key={column.title} className="site-footer__column">
                <h4 className="site-footer__column-title">{column.title}</h4>
                <ul className="site-footer__links">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="site-footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">{footerContent.copyright}</p>
          <nav className="site-footer__legal" aria-label="Legal">
            {footerContent.legal.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <span className="site-footer__legal-sep" aria-hidden="true">·</span>}
                <Link to={item.href} className="site-footer__legal-link">
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
          <div className="site-footer__social">
            {footerContent.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="site-footer__social-link"
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                <img src={item.icon} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer__wave" aria-hidden="true">
        <img src="/assets/images/b8mulzOlrN7PtGqORoizmta3Q-425ce3c5.svg" alt="" />
      </div>
    </footer>
  );
}
