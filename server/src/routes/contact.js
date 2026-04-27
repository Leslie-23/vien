const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST submit a contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }

    const entry = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message received', id: entry._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all contact submissions (admin)
router.get('/', async (_req, res) => {
  try {
    const entries = await Contact.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
