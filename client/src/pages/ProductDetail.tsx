import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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
  sizes: number[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
        return fetch(`/api/products?category=${data.category}`);
      })
      .then((r) => r.json())
      .then((data: Product[]) => {
        setRelated(data.filter((p) => p._id !== id).slice(0, 3));
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p className="loading-text">Loading product...</p>
      </div>
    );
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

  const images =
    product.gallery.length > 0
      ? product.gallery
      : [{ url: product.image.url, alt: product.name }];

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="detail-grid">
        {/* ── Image Gallery ─────────────────────────────── */}
        <div className="detail-gallery">
          <div className="detail-image-main">
            <img src={images[activeImg].url} alt={images[activeImg].alt} />
            {product.comparePrice > 0 && (
              <span className="badge badge-sale detail-badge">
                Save ${(product.comparePrice - product.price).toFixed(0)}
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="detail-thumbnails">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`thumb-btn ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img.url} alt={img.alt} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Info ──────────────────────────────── */}
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="detail-price-row">
            <span className="detail-price">
              ${product.price.toFixed(2)}
            </span>
            {product.comparePrice > 0 && (
              <span className="detail-compare-price">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.rating > 0 && (
            <div className="detail-rating">
              <span className="rating-stars">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </span>
              <span className="rating-text">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          <p className="detail-description">{product.description}</p>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="detail-tags">
              {product.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Size selector */}
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
              <strong>Material</strong>
              <span>{product.material || 'Premium leather'}</span>
            </div>
            <div className="meta-item">
              <strong>Color</strong>
              <span>{product.color || 'Classic'}</span>
            </div>
            <div className="meta-item">
              <strong>Availability</strong>
              <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div className="meta-item">
              <strong>Shipping</strong>
              <span>Free over $100</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <span className="trust-icon">&#9878;</span>
              <span>Handcrafted</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">&#8635;</span>
              <span>30-Day Returns</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">&#9733;</span>
              <span>Resoleable</span>
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
      )}
    </div>
  );
}
