import express from 'express';
import {
  getPartnerBicycles,
  addBicycle,
  updateBicycle,
  deleteBicycle
} from '../controllers/bicycleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getPartnerBicycles);
router.post('/', protect, addBicycle);
router.put('/:id', protect, updateBicycle);
router.delete('/:id', protect, deleteBicycle);

export default router;
