import Bicycle from '../models/bicycle.js';

// Add new bicycle
export const addBicycle = async (req, res) => {
  try {
    const {
      partnerId,
      name,
      type,
      brand,
      model,
      hourlyRate,
      dailyRate,
      description,
      location,
    } = req.body;

    const newBicycle = new Bicycle({
      partnerId,
      name,
      type,
      brand,
      model,
      hourlyRate,
      dailyRate,
      description,
      location,
    });

    await newBicycle.save();
    res.status(201).json({ message: 'Bicycle added successfully', bicycle: newBicycle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding bicycle', error: error.message });
  }
};

// Get all bicycles by partner
export const getBicyclesByPartner = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const bicycles = await Bicycle.find({ partnerId });
    res.json(bicycles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bicycles', error: error.message });
  }
};

// Delete a bicycle
export const deleteBicycle = async (req, res) => {
  try {
    const { id } = req.params;
    await Bicycle.findByIdAndDelete(id);
    res.json({ message: 'Bicycle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bicycle', error: error.message });
  }
};

// Update a bicycle
export const updateBicycle = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Bicycle.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating bicycle', error: error.message });
  }
};
