import express from 'express';
import {
  getBicycles,
  addBicycle,
  updateBicycle,
  deleteBicycle
} from '../controllers/bicycleController.js';

const router = express.Router();

router.get('/', getBicycles);
router.post('/', addBicycle);
router.put('/:id', updateBicycle);
router.delete('/:id', deleteBicycle);

export default router;
