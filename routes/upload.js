const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const router = express.Router();
const auth = require('../utils/auth');
const { sequelize } = require('../db');
const { QueryTypes } = require('sequelize');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint - no auth required (for registration)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
    // Upload to Cloudinary using stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: req.body.folder || 'blinkiefashride',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error);
          return res.status(500).json({ message: 'Cloudinary error', error: error.message });
        }
        res.json({ url: result.secure_url });
      }
    );
    
    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// Delivery photo upload — authenticated, saves URL to delivery record
router.post('/delivery-photo/:deliveryId', auth, upload.single('image'), async (req, res) => {
  const { deliveryId } = req.params;
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    // Verify this rider owns the delivery
    const rows = await sequelize.query(
      `SELECT id FROM deliveries WHERE id = :id AND rider_id = :riderId`,
      { replacements: { id: deliveryId, riderId: req.user.id }, type: QueryTypes.SELECT }
    );
    if (!rows.length) return res.status(403).json({ success: false, message: 'Forbidden' });

    // Upload to Cloudinary
    await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'blinkiefashride/deliveries', resource_type: 'image' },
        async (error, result) => {
          if (error) return reject(error);
          // Save URL to deliveries
          await sequelize.query(
            `UPDATE deliveries SET delivery_photo_url = :url WHERE id = :id`,
            { replacements: { url: result.secure_url, id: deliveryId }, type: QueryTypes.UPDATE }
          );
          res.json({ success: true, url: result.secure_url });
          resolve();
        }
      );
      stream.end(req.file.buffer);
    });
  } catch (err) {
    console.error('Delivery photo upload error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
