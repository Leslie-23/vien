const fs = require('fs/promises');
const cloudinary = require('../config/cloudinary');

const IMAGE_TRANSFORM = [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }];

const uploadToCloudinary = async (filePath) => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder: 'vien-shoes',
      transformation: IMAGE_TRANSFORM,
    });
  } finally {
    fs.unlink(filePath).catch(() => {});
  }
};

module.exports = { uploadToCloudinary };
