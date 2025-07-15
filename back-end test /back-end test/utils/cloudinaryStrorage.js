// utils/cloudinaryStorage.js
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './Cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bike-rentals',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

export default storage;
