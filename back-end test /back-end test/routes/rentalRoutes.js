import express from 'express';
import Rental from '../models/Rental.js';

const router = express.Router();

// GET /api/rentals/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const rentals = await Rental.find({ userId: req.params.userId });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
