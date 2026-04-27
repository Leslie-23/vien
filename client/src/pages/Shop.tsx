import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

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
  inStock: boolean;
  featured: boolean;
  sizes: number[];
  rating: number;
  reviewCount: number;
  tags: string[];
};

const CATEGORIES = [
  { slug: '', label: 'All' },
  { slug: 'boots', label: 'Boots' },
  { slug: 'sneakers', label: 'Sneakers' },
  { slug: 'oxfords', label: 'Oxfords' },
  { slug: 'loafers', label: 'Loafers' },
  { slug: 'sandals', label: 'Sandals' },
  { slug: 'heels', label: 'Heels' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory) params.set('category', activeCategory);
    if (sort) params.set('sort', sort);

    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory, sort]);

  const setCategory = (slug: string) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="shop-page">
      {/* ── Shop Hero ───────────────────────────────────── */}
      <section className="shop-hero">
        <div className="shop-hero-img-strip">
          <img
            src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=400&h=200&q=80"
            alt="Leather detail"
          />
          <img
            src="https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=400&h=200&q=80"
            alt="Boot crafting"
          />
          <img
            src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=400&h=200&q=80"
            alt="Worn boots"
          />
        </div>
        <h1>The Collection</h1>
        <p>
          Every pair, hand-picked. Filter by category, sort by what matters, and
          find the shoes that match your stride.
        </p>
        <span className="shop-count">{products.length} styles available</span>
      </section>

      {/* ── Filters ─────────────────────────────────────── */}
      <div className="shop-toolbar">
        <div className="filter-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              className={`filter-tab ${activeCategory === cat.slug ? 'active' : ''}`}
              onClick={() => setCategory(cat.slug)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Newest</option>
          <option value="price_asc">Price: Low &rarr; High</option>
          <option value="price_desc">Price: High &rarr; Low</option>
          <option value="name">Name A&ndash;Z</option>
        </select>
      </div>

      {/* ── Product Grid ────────────────────────────────── */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <p className="loading-text">Loading collection...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-collection">
          <h3>No shoes found</h3>
          <p>Try a different category or check back soon for new drops.</p>
        </div>
      ) : (
        <div className="product-grid shop-grid">
          {products.map((p) => (
            <Link key={p._id} to={`/shop/${p._id}`} className="product-card">
              <div className="product-img-wrap">
                <img src={p.image.url} alt={p.name} />
                {!p.inStock && <span className="badge sold-out">Sold Out</span>}
                {p.featured && p.inStock && (
                  <span className="badge">Featured</span>
                )}
                {p.comparePrice > 0 && p.inStock && !p.featured && (
                  <span className="badge badge-sale">Sale</span>
                )}
                {p.gallery.length > 1 && (
                  <span className="gallery-count">
                    +{p.gallery.length} photos
                  </span>
                )}
                <div className="product-quick-view">Quick View</div>
              </div>
              <div className="product-info">
                <span className="product-category">{p.category}</span>
                <h3>{p.name}</h3>
                {p.material && (
                  <span className="product-material">{p.material}</span>
                )}
                <p className="product-desc">{p.description}</p>
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
                  <div className="product-meta-right">
                    {p.rating > 0 && (
                      <span className="product-rating">
                        {'★'.repeat(Math.round(p.rating))} {p.rating}
                      </span>
                    )}
                    {p.sizes.length > 0 && (
                      <span className="product-sizes">
                        {p.sizes.length} sizes
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
