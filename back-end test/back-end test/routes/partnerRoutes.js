import express from 'express';
import auth, { isAdmin } from '../middlewares/authMiddleware.js';
import { allowRoles } from '../middlewares/roleMiddleware.js';
import {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
} from '../controllers/partnerController.js';

const router = express.Router();

// All routes require authentication first
router.use(auth);

// Admin-only routes
router.get('/', isAdmin, getAllPartners);
router.get('/:id', allowRoles('admin'), getPartnerById);
router.post('/', allowRoles('admin'), createPartner);
router.put('/:id', allowRoles('admin'), updatePartner);
router.delete('/:id', allowRoles('admin'), deletePartner);

export default router;
