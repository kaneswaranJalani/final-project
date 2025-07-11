import Bicycle from "../models/Bicycle.js";

// ✅ Add a bicycle (Authenticated Partner Only or Explicit partnerId)
export const addBicycle = async (req, res) => {
  try {
    const partnerId = req.partner?._id || req.body.partnerId;

    if (!partnerId) {
      return res.status(400).json({ message: "Partner ID is required" });
    }

    const { type, model, price, stock, status } = req.body;
    const newBicycle = new Bicycle({
      partner: partnerId,
      type,
      model,
      price,
      stock,
      status: status || "available",
      lastUpdate: new Date(),
    });

    await newBicycle.save();
    res.status(201).json(newBicycle);
  } catch (err) {
    res.status(500).json({ message: "Failed to add bicycle", error: err.message });
  }
};

// ✅ Get all bicycles for logged-in partner or given partnerId
export const getBicyclesByPartner = async (req, res) => {
  try {
    const partnerId = req.partner?._id || req.params.partnerId;

    if (!partnerId) {
      return res.status(400).json({ message: "Partner ID is required" });
    }

    const bicycles = await Bicycle.find({ partner: partnerId });
    res.status(200).json(bicycles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bicycles", error: err.message });
  }
};

// ✅ Update a bicycle (only for logged-in partner)
export const updateBicycle = async (req, res) => {
  try {
    const partnerId = req.partner?._id;
    const { id } = req.params;

    const bicycle = await Bicycle.findOne({ _id: id, partner: partnerId });
    if (!bicycle) return res.status(404).json({ message: "Bicycle not found" });

    Object.assign(bicycle, req.body, { lastUpdate: new Date() });
    await bicycle.save();

    res.status(200).json(bicycle);
  } catch (err) {
    res.status(500).json({ message: "Failed to update bicycle", error: err.message });
  }
};

// ✅ Delete a bicycle (only for logged-in partner)
export const deleteBicycle = async (req, res) => {
  try {
    const partnerId = req.partner?._id;
    const { id } = req.params;

    const bicycle = await Bicycle.findOneAndDelete({ _id: id, partner: partnerId });
    if (!bicycle) return res.status(404).json({ message: "Bicycle not found" });

    res.status(200).json({ message: "Bicycle deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bicycle", error: err.message });
  }
};

// ✅ Submit partner + bicycles in one request (useful for registration)
export const submitPartnerData = async (req, res) => {
  try {
    const { partner, bicycles } = req.body;

    if (!partner || !bicycles || !Array.isArray(bicycles)) {
      return res.status(400).json({ message: "Partner and bicycles data required" });
    }

    const savedBicycles = await Promise.all(
      bicycles.map((bike) => {
        const newBike = new Bicycle({
          partner: partner._id,
          type: bike.type,
          model: bike.model,
          price: bike.price,
          stock: bike.stock,
          status: bike.status || "available",
          lastUpdate: bike.lastUpdate || new Date(),
        });
        return newBike.save();
      })
    );

    res.status(200).json({ message: "Data saved", bicycles: savedBicycles });
  } catch (err) {
    res.status(500).json({ message: "Submission failed", error: err.message });
  }
};
