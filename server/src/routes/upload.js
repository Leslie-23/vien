const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const result = await uploadToCloudinary(req.file.path);
    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:publicId', async (req, res, next) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
