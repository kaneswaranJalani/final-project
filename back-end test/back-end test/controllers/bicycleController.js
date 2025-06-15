import Bicycle from '../models/bicycle.js';
import User from '../models/User.js';

// Add new bicycle
export const addBicycle = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { brand, model, color, price, gearCount, status } = req.body;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bicycle = new Bicycle({
      user: userId,
      brand,
      model,
      color,
      price,
      gearCount,
      status
    });

    const savedBicycle = await bicycle.save();
    res.status(201).json(savedBicycle);
  } catch (err) {
    console.error('Error adding bicycle:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all bicycles
export const getAllBicycles = async (req, res, next) => {
  try {
    const bicycles = await Bicycle.find().populate('user', 'name email');
    res.status(200).json(bicycles);
  } catch (err) {
    console.error('Error fetching bicycles:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update bicycle
export const updateBicycle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedBicycle = await Bicycle.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBicycle) {
      return res.status(404).json({ message: 'Bicycle not found' });
    }

    res.status(200).json(updatedBicycle);
  } catch (err) {
    console.error('Error updating bicycle:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete bicycle
export const deleteBicycle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bicycle = await Bicycle.findByIdAndDelete(id);
    if (!bicycle) {
      return res.status(404).json({ message: 'Bicycle not found' });
    }

    res.status(200).json({ message: 'Bicycle deleted successfully' });
  } catch (err) {
    console.error('Error deleting bicycle:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
