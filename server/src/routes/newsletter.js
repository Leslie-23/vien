const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// POST subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Already subscribed' });
    }

    await Newsletter.create({ email });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
