import Bicycle from '../models/bicycle.js';

// Get all bicycles
export const getAllBicycles = async (req, res) => {
  try {
    const bicycles = await Bicycle.find();
    res.json(bicycles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bicycles' });
  }
};

// Create a new bicycle
export const createBicycle = async (req, res) => {
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
};
