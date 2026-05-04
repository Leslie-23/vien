const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
  try {
    const email = (req.body.email || '').trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'A valid email is required' });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Already subscribed' });
    }

    await Newsletter.create({ email });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
