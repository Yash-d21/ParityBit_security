export const NEWSLETTER_WEBHOOK_URL =
  'https://laksdalsmdlasdmasd.app.n8n.cloud/webhook/newsletter-subscribe';

export const NEWSLETTER_SUCCESS_MESSAGE =
  "You're subscribed. We'll send the next digest to your inbox.";

export type NewsletterSubscribeResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function subscribeNewsletter(email: string): Promise<NewsletterSubscribeResult> {
  try {
    const response = await fetch(NEWSLETTER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() }),
    });

    if (response.status === 200) {
      return { ok: true, message: NEWSLETTER_SUCCESS_MESSAGE };
    }

    if (response.status === 409) {
      return { ok: false, message: 'This email is already subscribed.' };
    }

    if (response.status === 400) {
      return { ok: false, message: 'Please enter a valid email address.' };
    }

    return { ok: false, message: 'Something went wrong. Please try again.' };
  } catch {
    return { ok: false, message: 'Something went wrong. Please try again.' };
  }
}
