require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
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

// Ensure temp upload dir exists
const uploadDir = '/tmp/vien-uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Routes
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
    { slug: 'sandals', name: 'Sandals', description: 'Stripped-back comfort' },
    { slug: 'loafers', name: 'Loafers', description: 'Effortless sophistication' },
    { slug: 'heels', name: 'Heels', description: 'Bold statement pieces' },
    { slug: 'oxfords', name: 'Oxfords', description: 'Heritage craftsmanship' },
    { slug: 'other', name: 'Other', description: 'One of a kind' },
  ]);
});

// Startup
const startServer = async () => {
  await connectDB();

  // Seed default products if collection is empty
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
