import Bicycle from '../models/bicycle.js';

// GET all bicycles
export const getBicycles = async (req, res) => {
  try {
    const bicycles = await Bicycle.find();
    res.json(bicycles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bicycles' });
  }
};

// POST create a new bicycle
export const addBicycle = async (req, res) => {
  try {
    const newBicycle = new Bicycle(req.body);
    await newBicycle.save();
    res.status(201).json(newBicycle);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add bicycle' });
  }
};

// PUT update a bicycle
export const updateBicycle = async (req, res) => {
  try {
    const updatedBike = await Bicycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBike);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update bicycle' });
  }
};

// DELETE bicycle
export const deleteBicycle = async (req, res) => {
  try {
    await Bicycle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bicycle deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete bicycle' });
  }
};
