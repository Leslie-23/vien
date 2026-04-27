import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = {
      name: formState.name.trim(),
      price: Number(formState.price),
      description: formState.description.trim(),
      image:
        formState.image.trim() ||
        'https://images.unsplash.com/photo-1519741496100-a9e7c32d5db1?auto=format&fit=crop&w=800&q=80'
    };

    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || 'Unable to add product');
          });
        }
        return response.json();
      })
      .then(() => {
        setFormState({ name: '', price: '', description: '', image: '' });
        loadProducts();
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="app-shell">
      <nav className="topbar">
        <div className="brand">ShoesCo</div>
        <div className="nav-links">
          <a href="#products">Catalog</a>
          <a href="#add-new">Add Shoe</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <header className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Urban footwear, curated</span>
          <h1>Launch your shoe store with confidence.</h1>
          <p>
            Create bold collections, preview your latest sneaker drops, and keep every
            product looking premium.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#products">
              Browse catalog
            </a>
            <a className="button button-secondary" href="#add-new">
              Add new shoe
            </a>
          </div>
        </div>

        <div className="hero-panel-right">
          <div className="stats-grid">
            <div className="stats-card">
              <span>Total styles</span>
              <strong>{products.length}</strong>
            </div>
            <div className="stats-card accent">
              <span>Fresh drops</span>
              <strong>3 new</strong>
            </div>
          </div>
          <div className="hero-banner">
            <div className="hero-banner-copy">
              <p>Latest arrival</p>
              {products[0] ? (
                <>
                  <h2>{products[0].name}</h2>
                  <p>{products[0].description}</p>
                  <strong>${products[0].price.toFixed(2)}</strong>
                </>
              ) : (
                <p>Start by adding your first shoe.</p>
              )}
            </div>
            <img src={products[0]?.image ?? 'https://images.unsplash.com/photo-1519741496100-a9e7c32d5db1?auto=format&fit=crop&w=800&q=80'} alt="Featured shoe" />
          </div>
        </div>
      </header>

      <section className="main-grid">
        <div className="catalog-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Catalog</p>
              <h2 id="products">Current lineup</h2>
            </div>
            <p>Stylish shoes ready for your shop window.</p>
          </div>

          {loading && <p className="status">Loading products…</p>}
          {error && <p className="error">{error}</p>}

          <div className="product-grid">
            {products.length === 0 && !loading ? (
              <div className="empty-state">
                <p>No shoes yet. Add a new style to get started.</p>
              </div>
            ) : (
              products.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-copy">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                    </div>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="form-panel">
          <div className="form-card" id="add-new">
            <p className="eyebrow">New product</p>
            <h2>Add a shoe</h2>
            <p className="form-intro">Fill in the details and launch your next shoe style.</p>
            <form onSubmit={handleSubmit}>
              <label className="form-field">
                <span>Name</span>
                <input name="name" value={formState.name} onChange={handleChange} required />
              </label>
              <label className="form-field">
                <span>Price</span>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  value={formState.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="form-field">
                <span>Description</span>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="form-field">
                <span>Image URL</span>
                <input
                  name="image"
                  value={formState.image}
                  onChange={handleChange}
                  placeholder="Optional image URL"
                />
              </label>
              <button className="button button-primary" type="submit" disabled={submitting}>
                {submitting ? 'Adding...' : 'Publish shoe'}
              </button>
            </form>
          </div>
        </aside>
      </section>

      <footer className="footer" id="about">
        <p>Designed for boutique shoe brands and small online shops.</p>
      </footer>
    </div>
  );
}

export default App;
