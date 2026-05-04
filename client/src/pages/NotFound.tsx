import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="not-found-page">
      <span className="eyebrow">404</span>
      <h1>This trail went cold.</h1>
      <p>The page you're after isn't here. Let's get you back on the road.</p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
        <Link to="/shop" className="btn btn-outline">
          Browse the shop
        </Link>
      </div>
    </section>
  );
}
