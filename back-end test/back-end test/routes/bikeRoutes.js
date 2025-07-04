import express from 'express';
import {
  getAllBikes,
  createBike,
  updateBikeStatus,
  deleteBike
} from '../controllers/bikeController.js';

const router = express.Router();

router.get('/all', getAllBikes);
router.post('/add', createBike);
router.put('/status/:id', updateBikeStatus);
router.delete('/:id', deleteBike);

export default router;
