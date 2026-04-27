import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: { url: string; publicId: string };
  category: string;
  featured: boolean;
};

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((r) => r.json())
      .then((data: Product[]) => setFeatured(data))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tag">Est. 2024 &mdash; Handcrafted Edge</span>
          <h1>
            Shoes forged <br />
            for the <em>untamed</em>.
          </h1>
          <p>
            Raw leather. Weathered soles. Every pair tells a story of grit,
            craftsmanship, and the road less traveled.
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="btn btn-primary">
              Explore the Collection
            </Link>
            <Link to="/about" className="btn btn-outline">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Showcase ────────────────────────────── */}
      <section className="section categories-section">
        <div className="section-header">
          <span className="eyebrow">Walk your own path</span>
          <h2>Shop by Category</h2>
        </div>
        <div className="category-grid">
          {[
            {
              name: 'Boots',
              slug: 'boots',
              img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80',
              tagline: 'Built for the wild',
            },
            {
              name: 'Sneakers',
              slug: 'sneakers',
              img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
              tagline: 'Street-level edge',
            },
            {
              name: 'Oxfords',
              slug: 'oxfords',
              img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80',
              tagline: 'Heritage redefined',
            },
            {
              name: 'Loafers',
              slug: 'loafers',
              img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80',
              tagline: 'Effortless edge',
            },
          ].map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="category-card"
            >
              <img src={cat.img} alt={cat.name} />
              <div className="category-card-overlay">
                <h3>{cat.name}</h3>
                <span>{cat.tagline}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────── */}
      <section className="section featured-section">
        <div className="section-header">
          <span className="eyebrow">Curated picks</span>
          <h2>Featured Collection</h2>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <Link key={p._id} to={`/shop/${p._id}`} className="product-card">
              <div className="product-img-wrap">
                <img src={p.image.url} alt={p.name} />
                {p.featured && <span className="badge">Featured</span>}
              </div>
              <div className="product-info">
                <span className="product-category">{p.category}</span>
                <h3>{p.name}</h3>
                <span className="product-price">${p.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="section-cta">
          <Link to="/shop" className="btn btn-primary">
            View All Shoes
          </Link>
        </div>
      </section>

      {/* ── Brand Banner ─────────────────────────────────── */}
      <section className="brand-banner">
        <div className="brand-banner-content">
          <h2>
            Worn. Weathered. <em>Yours.</em>
          </h2>
          <p>
            Every scuff is earned. Every crease is a chapter. We don't make
            shoes for display cases&mdash;we make them for the road.
          </p>
          <Link to="/about" className="btn btn-outline">
            Read Our Story
          </Link>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="section testimonials-section">
        <div className="section-header">
          <span className="eyebrow">Worn &amp; reviewed</span>
          <h2>What People Say</h2>
        </div>
        <div className="testimonial-grid">
          {[
            {
              quote:
                "These boots survived a cross-country road trip and still look better than the day I bought them.",
              author: 'Marcus T.',
              role: 'Photographer',
            },
            {
              quote:
                "Finally, sneakers that don't look like everyone else's. The raw suede finish is unreal.",
              author: 'Jade L.',
              role: 'Creative Director',
            },
            {
              quote:
                "The oxfords have this patina that makes them look vintage from day one. Obsessed.",
              author: 'Ravi K.',
              role: 'Architect',
            },
          ].map((t, i) => (
            <div key={i} className="testimonial-card">
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="testimonial-author">
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
