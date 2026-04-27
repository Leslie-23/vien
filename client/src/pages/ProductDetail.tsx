import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: { url: string; publicId: string };
  category: string;
  sizes: number[];
  inStock: boolean;
  featured: boolean;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
        // load related products from same category
        return fetch(`/api/products?category=${data.category}`);
      })
      .then((r) => r.json())
      .then((data: Product[]) => {
        setRelated(data.filter((p) => p._id !== id).slice(0, 3));
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="loading-text">Loading product...</p>;
  }

  if (!product) {
    return (
      <div className="not-found-page">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image.url} alt={product.name} />
        </div>

        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <span className="detail-price">${product.price.toFixed(2)}</span>

          <p className="detail-description">{product.description}</p>

          {product.sizes.length > 0 && (
            <div className="size-selector">
              <h4>Select Size</h4>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="detail-actions">
            <button
              className="btn btn-primary btn-lg"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Sold Out'}
            </button>
          </div>

          <div className="detail-meta">
            <div className="meta-item">
              <strong>Availability</strong>
              <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div className="meta-item">
              <strong>Category</strong>
              <span>{product.category}</span>
            </div>
            <div className="meta-item">
              <strong>Shipping</strong>
              <span>Free over $100</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ──────────────────────────── */}
      {related.length > 0 && (
        <section className="section related-section">
          <div className="section-header">
            <span className="eyebrow">More like this</span>
            <h2>Related Shoes</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <Link key={p._id} to={`/shop/${p._id}`} className="product-card">
                <div className="product-img-wrap">
                  <img src={p.image.url} alt={p.name} />
                </div>
                <div className="product-info">
                  <span className="product-category">{p.category}</span>
                  <h3>{p.name}</h3>
                  <span className="product-price">${p.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
