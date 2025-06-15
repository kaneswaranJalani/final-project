import express from 'express';
import { 
  addBicycle, 
  getAllBicycles, 
  updateBicycle, 
  deleteBicycle 
} from '../controllers/bicycleController.js';

const router = express.Router();

// ✅ Create bicycle for a user (userId in URL)
router.post('/user/:userId', addBicycle);

// ✅ Get all bicycles
router.get('/', getAllBicycles);

// ✅ Update bicycle by ID
router.put('/:id', updateBicycle);

// ✅ Delete bicycle by ID
router.delete('/:id', deleteBicycle);

export default router;
