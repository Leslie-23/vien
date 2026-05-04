require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const defaultProducts = require('./utils/seedData');

const productRoutes = require('./routes/products');
const uploadRoutes = require('./routes/upload');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to the Vien Shoes API' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Vien Shoes backend' });
});

app.get('/api/categories', (_req, res) => {
  res.json([
    { slug: 'boots', name: 'Boots', description: 'Rugged, weathered, built to last' },
    { slug: 'sneakers', name: 'Sneakers', description: 'Street-ready edge' },
    { slug: 'oxfords', name: 'Oxfords', description: 'Heritage craftsmanship' },
    { slug: 'loafers', name: 'Loafers', description: 'Effortless sophistication' },
    { slug: 'sandals', name: 'Sandals', description: 'Stripped-back comfort' },
    { slug: 'other', name: 'Other', description: 'One of a kind' },
  ]);
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server error' });
});

const startServer = async () => {
  await connectDB();

  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(defaultProducts);
    console.log('Seeded default products');
  }

  app.listen(port, () => {
    console.log(`Vien Shoes backend running at http://localhost:${port}`);
  });
};

startServer();
