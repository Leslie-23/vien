import { useState, type FormEvent } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((data) => {
        setStatus(data.message || 'Sent!');
        setForm({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => setStatus('Something went wrong. Please try again.'))
      .finally(() => setSending(false));
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <span className="eyebrow">Get in touch</span>
        <h1>
          Let&apos;s <em>talk</em>.
        </h1>
        <p>
          Questions about sizing, custom orders, or collaborations? Drop us a
          line and we'll get back to you within 24 hours.
        </p>
      </section>

      <div className="contact-grid">
        <div className="contact-info-panel">
          <div className="contact-info-card">
            <h3>Visit the Workshop</h3>
            <p>
              42 Cobblestone Lane
              <br />
              Brooklyn, NY 11201
            </p>
          </div>
          <div className="contact-info-card">
            <h3>Hours</h3>
            <p>
              Mon – Fri: 10am – 7pm
              <br />
              Sat: 11am – 5pm
              <br />
              Sun: Closed
            </p>
          </div>
          <div className="contact-info-card">
            <h3>Email</h3>
            <p>hello@vienshoes.com</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-field">
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </label>
          </div>
          <label className="form-field">
            <span>Subject</span>
            <input
              name="subject"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              placeholder="Optional"
            />
          </label>
          <label className="form-field">
            <span>Message</span>
            <textarea
              name="message"
              rows={6}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              required
            />
          </label>
          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </div>
  );
}
