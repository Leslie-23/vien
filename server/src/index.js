const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: 'Classic White Sneaker',
    price: 79.99,
    description: 'A timeless sneaker for everyday comfort and style.',
    image: 'https://images.unsplash.com/photo-1519741496100-a9e7c32d5db1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Running Performance Shoe',
    price: 119.99,
    description: 'Engineered for speed, cushioning, and long-distance support.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Leather Boot',
    price: 149.99,
    description: 'Durable leather boot built for rugged city and trail use.',
    image: 'https://images.unsplash.com/photo-1528701800489-38e7f3e0a3d0?auto=format&fit=crop&w=800&q=80'
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price || !description || !image) {
    return res.status(400).json({ error: 'Missing required product fields' });
  }

  const nextId = products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1;
  const newProduct = {
    id: nextId,
    name,
    price: Number(price),
    description,
    image
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, price, description, image } = req.body;

  if (name) {
    product.name = name;
  }
  if (price) {
    product.price = Number(price);
  }
  if (description) {
    product.description = description;
  }
  if (image) {
    product.image = image;
  }

  res.json(product);
});

app.delete('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex((item) => item.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(index, 1);
  res.status(204).end();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ShoesCo backend' });
});

app.listen(port, () => {
  console.log(`ShoesCo backend running at http://localhost:${port}`);
});
