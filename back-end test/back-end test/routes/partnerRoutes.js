import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { allowRoles } from '../middlewares/roleMiddleware.js';
import {
  getProfile,
  updateProfile,
  getLinkedUsers,
} from '../controllers/partnerController.js';

const router = express.Router();

router.use(auth, allowRoles('partner'));
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/users', getLinkedUsers);

export default router;