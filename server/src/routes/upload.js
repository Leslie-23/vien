const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');
const fs = require('fs');

// POST upload a single image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'vien-shoes',
      transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
    });

    fs.unlinkSync(req.file.path);

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remove image from Cloudinary by publicId
router.delete('/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
