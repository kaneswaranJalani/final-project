// routes/upload.js
import express from 'express';
import multer from 'multer';
import storage from '../utils/cloudinaryStrorage.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({
      message: 'Upload successful',
      imageUrl: req.file.path, // Cloudinary URL
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
