import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: { url: string; publicId: string };
  category: string;
  inStock: boolean;
  featured: boolean;
  sizes: number[];
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
        <h1>The Collection</h1>
        <p>
          Every pair, hand-picked. Filter by category, sort by what matters, and
          find the shoes that match your stride.
        </p>
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
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* ── Product Grid ────────────────────────────────── */}
      {loading ? (
        <p className="loading-text">Loading collection...</p>
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
              </div>
              <div className="product-info">
                <span className="product-category">{p.category}</span>
                <h3>{p.name}</h3>
                <p className="product-desc">{p.description}</p>
                <div className="product-meta">
                  <span className="product-price">${p.price.toFixed(2)}</span>
                  {p.sizes.length > 0 && (
                    <span className="product-sizes">
                      {p.sizes.length} sizes
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
