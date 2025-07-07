import Bicycle from "../models/bicycle.js";

// Add a bicycle
export const addBicycle = async (req, res) => {
  try {
    const { partnerId, type, model, price, stock } = req.body;
    const newBicycle = new Bicycle({
      partnerId,
      type,
      model,
      price,
      stock,
      lastUpdate: new Date().toLocaleDateString(),
    });
    await newBicycle.save();
    res.status(201).json(newBicycle);
  } catch (err) {
    res.status(500).json({ message: "Failed to add bicycle", error: err.message });
  }
};

// Get all bicycles for a partner
export const getBicyclesByPartner = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const bikes = await Bicycle.find({ partnerId });
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bicycles", error: err.message });
  }
};

// Delete a bicycle
export const deleteBicycle = async (req, res) => {
  try {
    const { id } = req.params;
    await Bicycle.findByIdAndDelete(id);
    res.status(200).json({ message: "Bicycle deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bicycle", error: err.message });
  }
};

// Submit all partner + bicycles (if needed in one request)
export const submitPartnerData = async (req, res) => {
  try {
    const { partner, bicycles } = req.body;

    // Save bicycles
    const savedBicycles = await Promise.all(
      bicycles.map((bike) => {
        const newBike = new Bicycle({
          partnerId: partner._id,
          type: bike.type,
          model: bike.model,
          price: bike.price,
          stock: bike.stock,
          status: bike.status,
          lastUpdate: bike.lastUpdate,
        });
        return newBike.save();
      })
    );

    res.status(200).json({ message: "Data saved", bicycles: savedBicycles });
  } catch (err) {
    res.status(500).json({ message: "Submission failed", error: err.message });
  }
};
