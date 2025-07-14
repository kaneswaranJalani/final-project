import express from 'express';
import {
  addBicycle,
  getBicyclesByPartner,
  deleteBicycle,
  updateBicycle,
} from '../controllers/bicycleController.js';

const router = express.Router();

// POST - Add Bicycle
router.post('/', addBicycle);

// GET - Get Bicycles for a Partner
router.get('/partner/:partnerId', getBicyclesByPartner);

// DELETE - Delete Bicycle
router.delete('/:id', deleteBicycle);

// PUT - Update Bicycle
router.put('/:id', updateBicycle);

export default router;
