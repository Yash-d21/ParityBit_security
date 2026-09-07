import React, { FormEvent, useState } from 'react';
import { footerContent } from '../content/footer';
import { ctaContent } from '../content/cta';
import { subscribeNewsletter } from '../lib/newsletter';
import './CtaSection.css';

export function CtaSection() {
  const { newsletter } = footerContent;
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(
    null,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    <section className="cta-section" data-framer-name="CTA Section">
      <div className="cta-section__bg" aria-hidden="true">
        <img src={ctaContent.background} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="cta-section__container">
        <p className="cta-section__eyebrow">{newsletter.eyebrow}</p>
        <h2 className="cta-section__title">{newsletter.title}</h2>
        <p className="cta-section__desc">{newsletter.description}</p>
        <div className="cta-section__accent-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <form className="cta-section__form" onSubmit={handleSubmit}>
          <label className="cta-section__visually-hidden" htmlFor="cta-newsletter-email">
            Work email
          </label>
          <input
            id="cta-newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={newsletter.placeholder}
            className="cta-section__input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
          />
          <button type="submit" className="cta-section__button" disabled={isSubmitting}>
            {newsletter.buttonLabel}
          </button>
        </form>
        {feedback ? (
          <p
            className="cta-section__desc"
            role="status"
            aria-live="polite"
            data-newsletter-feedback={feedback.tone}
          >
            {feedback.message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
