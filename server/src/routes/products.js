const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');
const fs = require('fs');

// GET all products (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, featured, inStock, sort } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (inStock === 'true') filter.inStock = true;

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'name') sortOption = { name: 1 };

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new product (with optional image upload)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, sizes, featured } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ error: 'name, price, and description are required' });
    }

    let imageData = { url: '', publicId: '' };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'vien-shoes',
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
      });
      imageData = { url: result.secure_url, publicId: result.public_id };
      fs.unlinkSync(req.file.path);
    } else if (req.body.imageUrl) {
      imageData = { url: req.body.imageUrl, publicId: '' };
    }

    const product = await Product.create({
      name,
      price: Number(price),
      description,
      image: imageData,
      category: category || 'other',
      sizes: sizes ? JSON.parse(sizes) : [],
      featured: featured === 'true',
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const { name, price, description, category, sizes, featured, inStock } = req.body;

    if (name) product.name = name;
    if (price) product.price = Number(price);
    if (description) product.description = description;
    if (category) product.category = category;
    if (sizes) product.sizes = JSON.parse(sizes);
    if (featured !== undefined) product.featured = featured === 'true';
    if (inStock !== undefined) product.inStock = inStock === 'true';

    if (req.file) {
      // Remove old image from Cloudinary if present
      if (product.image.publicId) {
        await cloudinary.uploader.destroy(product.image.publicId);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'vien-shoes',
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
      });
      product.image = { url: result.secure_url, publicId: result.public_id };
      fs.unlinkSync(req.file.path);
    } else if (req.body.imageUrl) {
      product.image = { url: req.body.imageUrl, publicId: '' };
    }

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.image.publicId) {
      await cloudinary.uploader.destroy(product.image.publicId);
    }

    await product.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
