import express from 'express';
import Bicycle from '../models/bicycle.js';

const router = express.Router();

// GET all bicycles
router.get('/', async (req, res) => {
  try {
    const bicycles = await Bicycle.find();
    res.status(200).json(bicycles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bicycles', error: err.message });
  }
});

// POST create a new bicycle
router.post('/', async (req, res) => {
  try {
    const { bicycleName, category, price, bikeId } = req.body;

    if (!bicycleName || !category || !price || !bikeId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBicycle = new Bicycle({
      bicycleName,
      category,
      price,
      bikeId,
    });

    const savedBicycle = await newBicycle.save();
    res.status(201).json(savedBicycle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create bicycle', error: err.message });
  }
});

export default router;
