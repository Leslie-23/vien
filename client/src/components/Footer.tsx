import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setStatus('');
    try {
      const data = await apiFetch<{ message?: string }>('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(data.message || 'Subscribed!');
      setEmail('');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>VIEN</h3>
          <p>
            Raw craftsmanship meets urban grit. Shoes forged for those who walk
            their own path.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navigate</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <Link to="/shop?category=boots">Boots</Link>
          <Link to="/shop?category=sneakers">Sneakers</Link>
          <Link to="/shop?category=oxfords">Oxfords</Link>
          <Link to="/shop?category=loafers">Loafers</Link>
          <Link to="/shop?category=sandals">Sandals</Link>
        </div>

        <div className="footer-newsletter">
          <h4>Stay in the loop</h4>
          <p>Get notified about new drops and exclusive releases.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={sending}>
              {sending ? '…' : 'Join'}
            </button>
          </form>
          {status && <p className="newsletter-status">{status}</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VIEN. All rights reserved.</p>
      </div>
    </footer>
  );
}
