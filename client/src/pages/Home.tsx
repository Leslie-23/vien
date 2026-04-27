import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  _id: string;
  name: string;
  price: number;
  comparePrice: number;
  description: string;
  image: { url: string; publicId: string };
  gallery: { url: string; alt: string }[];
  category: string;
  material: string;
  color: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
};

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((r) => r.json())
      .then((data: Product[]) => setFeatured(data))
      .catch(() => {});
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: Product[]) => setAllProducts(data))
      .catch(() => {});
  }, []);

  const newArrivals = allProducts.slice(0, 4);

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

      {/* ── Marquee Strip ──────────────────────────────────── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {Array(3)
            .fill([
              'FREE SHIPPING OVER $100',
              'HANDCRAFTED IN PORTLAND',
              'GOODYEAR WELTED',
              'FULL-GRAIN LEATHER',
              'SMALL BATCH DROPS',
              'RESOLEABLE FOR LIFE',
            ])
            .flat()
            .map((text, i) => (
              <span key={i} className="marquee-item">
                {text}
              </span>
            ))}
        </div>
      </div>

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
              count: allProducts.filter((p) => p.category === 'boots').length,
            },
            {
              name: 'Sneakers',
              slug: 'sneakers',
              img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
              tagline: 'Street-level edge',
              count: allProducts.filter((p) => p.category === 'sneakers').length,
            },
            {
              name: 'Oxfords',
              slug: 'oxfords',
              img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80',
              tagline: 'Heritage redefined',
              count: allProducts.filter((p) => p.category === 'oxfords').length,
            },
            {
              name: 'Loafers',
              slug: 'loafers',
              img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80',
              tagline: 'Effortless edge',
              count: allProducts.filter((p) => p.category === 'loafers').length,
            },
          ].map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="category-card"
            >
              <img src={cat.img} alt={cat.name} />
              <div className="category-card-overlay">
                <span className="cat-count">{cat.count} styles</span>
                <h3>{cat.name}</h3>
                <span>{cat.tagline}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Lifestyle Split Banner ─────────────────────────── */}
      <section className="lifestyle-split">
        <div className="lifestyle-img">
          <img
            src="https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=900&q=80"
            alt="Artisan crafting leather boots"
          />
        </div>
        <div className="lifestyle-text">
          <span className="eyebrow">The Workshop</span>
          <h2>
            Every stitch <br />
            has a <em>purpose</em>.
          </h2>
          <p>
            Our Portland workshop runs on obsession. Each pair passes through 14
            hands before it reaches yours. No machines. No shortcuts. Just
            decades of craft compressed into leather and thread.
          </p>
          <div className="lifestyle-stats">
            <div className="stat">
              <span className="stat-number">14</span>
              <span className="stat-label">Artisan steps</span>
            </div>
            <div className="stat">
              <span className="stat-number">72h</span>
              <span className="stat-label">Per pair</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Handmade</span>
            </div>
          </div>
          <Link to="/about" className="btn btn-primary">
            Our Process
          </Link>
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
                {p.comparePrice > 0 && (
                  <span className="badge badge-sale">Sale</span>
                )}
                <div className="product-quick-view">Quick View</div>
              </div>
              <div className="product-info">
                <span className="product-category">{p.category}</span>
                <h3>{p.name}</h3>
                {p.material && (
                  <span className="product-material">{p.material}</span>
                )}
                <div className="product-meta">
                  <div className="product-pricing">
                    <span className="product-price">
                      ${p.price.toFixed(2)}
                    </span>
                    {p.comparePrice > 0 && (
                      <span className="product-compare-price">
                        ${p.comparePrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {p.rating > 0 && (
                    <span className="product-rating">
                      {'★'.repeat(Math.round(p.rating))} {p.rating}
                    </span>
                  )}
                </div>
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

      {/* ── Full-Width Image Break ────────────────────────── */}
      <section className="full-image-break">
        <img
          src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1600&q=80"
          alt="Worn leather boots on dusty terrain"
        />
        <div className="full-image-overlay">
          <span className="eyebrow" style={{ color: '#b8964e' }}>
            Made to last
          </span>
          <h2>
            Some shoes are worn. <br />
            Ours are <em>lived in</em>.
          </h2>
        </div>
      </section>

      {/* ── New Arrivals ──────────────────────────────────── */}
      <section className="section new-arrivals-section">
        <div className="section-header">
          <span className="eyebrow">Fresh drops</span>
          <h2>New Arrivals</h2>
        </div>
        <div className="product-grid">
          {newArrivals.map((p) => (
            <Link key={p._id} to={`/shop/${p._id}`} className="product-card">
              <div className="product-img-wrap">
                <img src={p.image.url} alt={p.name} />
                <span className="badge badge-new">New</span>
                <div className="product-quick-view">Quick View</div>
              </div>
              <div className="product-info">
                <span className="product-category">{p.category}</span>
                <h3>{p.name}</h3>
                {p.material && (
                  <span className="product-material">{p.material}</span>
                )}
                <div className="product-meta">
                  <span className="product-price">
                    ${p.price.toFixed(2)}
                  </span>
                  {p.rating > 0 && (
                    <span className="product-rating">
                      {'★'.repeat(Math.round(p.rating))} {p.rating}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Brand Banner ─────────────────────────────────── */}
      <section className="brand-banner">
        <div className="brand-banner-bg">
          <img
            src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1600&q=80"
            alt="Leather workshop detail"
          />
        </div>
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

      {/* ── Instagram / Gallery Grid ──────────────────────── */}
      <section className="section gallery-section">
        <div className="section-header">
          <span className="eyebrow">#VienOnTheRoad</span>
          <h2>Worn by You</h2>
        </div>
        <div className="gallery-grid">
          {[
            'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&h=400&q=80',
          ].map((src, i) => (
            <div key={i} className="gallery-item">
              <img src={src} alt={`Community photo ${i + 1}`} />
              <div className="gallery-overlay">
                <span>@vien.shoes</span>
              </div>
            </div>
          ))}
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
                'These boots survived a cross-country road trip and still look better than the day I bought them.',
              author: 'Marcus T.',
              role: 'Photographer',
              rating: 5,
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
            },
            {
              quote:
                "Finally, sneakers that don't look like everyone else's. The raw suede finish is unreal.",
              author: 'Jade L.',
              role: 'Creative Director',
              rating: 5,
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
            },
            {
              quote:
                'The oxfords have this patina that makes them look vintage from day one. Obsessed.',
              author: 'Ravi K.',
              role: 'Architect',
              rating: 5,
              img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80',
            },
          ].map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {'★'.repeat(t.rating)}
              </div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="testimonial-author">
                <img
                  src={t.img}
                  alt={t.author}
                  className="testimonial-avatar"
                />
                <div>
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
