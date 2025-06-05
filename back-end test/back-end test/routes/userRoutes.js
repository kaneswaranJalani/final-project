import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import {
  getProfile,
  updateProfile,
  deleteAccount,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.delete('/account', auth, deleteAccount);

export default router;