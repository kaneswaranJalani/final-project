// routes/bicycleRoutes.js
import express from 'express';
import Bicycle from '../models/Bicycle.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get bicycles for logged-in partner
router.get('/', protect, async (req, res) => {
  try {
    const bicycles = await Bicycle.find({ partner: req.partner._id });
    res.json(bicycles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bicycles' });
  }
});

// Add a bicycle (partner only)
router.post('/', protect, async (req, res) => {
  try {
    const { type, model, price, stock, status } = req.body;
    const bicycle = new Bicycle({
      partner: req.partner._id,
      type,
      model,
      price,
      stock,
      status,
      lastUpdate: new Date(),
    });
    await bicycle.save();
    res.status(201).json(bicycle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add bicycle' });
  }
});

// Update bicycle by id (partner only)
router.put('/:id', protect, async (req, res) => {
  try {
    const bicycle = await Bicycle.findOne({ _id: req.params.id, partner: req.partner._id });
    if (!bicycle) return res.status(404).json({ message: 'Bicycle not found' });

    Object.assign(bicycle, req.body, { lastUpdate: new Date() });
    await bicycle.save();

    res.json(bicycle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update bicycle' });
  }
});

// Delete bicycle by id (partner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const bicycle = await Bicycle.findOneAndDelete({ _id: req.params.id, partner: req.partner._id });
    if (!bicycle) return res.status(404).json({ message: 'Bicycle not found' });
    res.json({ message: 'Bicycle deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete bicycle' });
  }
});

export default router;
