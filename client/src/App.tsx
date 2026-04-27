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
      image: formState.image.trim() || 'https://images.unsplash.com/photo-1519741496100-a9e7c32d5db1?auto=format&fit=crop&w=800&q=80'
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
      <header className="hero">
        <div>
          <p className="eyebrow">ShoesCo</p>
          <h1>Stylish shoes for every step.</h1>
          <p>Browse our curated collection and add new shoe styles to your storefront.</p>
        </div>
      </header>

      <main className="content">
        <section className="product-form card">
          <h2>Add a new shoe</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={formState.name} onChange={handleChange} required />
            </label>
            <label>
              Price
              <input name="price" type="number" step="0.01" value={formState.price} onChange={handleChange} required />
            </label>
            <label>
              Description
              <textarea name="description" value={formState.description} onChange={handleChange} required />
            </label>
            <label>
              Image URL
              <input name="image" value={formState.image} onChange={handleChange} placeholder="Optional image URL" />
            </label>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add shoe'}
            </button>
          </form>
        </section>

        {loading && <p>Loading products...</p>}
        {error && <p className="error">{error}</p>}

        <section className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="card">
              <img src={product.image} alt={product.name} />
              <div className="card-body">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <strong>${product.price.toFixed(2)}</strong>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
