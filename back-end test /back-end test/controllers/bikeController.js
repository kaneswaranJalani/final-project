import mongoose from 'mongoose';
import Bike from '../models/bike.js';

// GET /api/bike/all
export const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    console.error("GET /all error:", error);
    res.status(500).json({ message: "Failed to fetch bikes" });
  }
};

// POST /api/bike/add
// controllers/bikeController.js

export const createBikes = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required" });
    }

    // Optional: validate fields in each item
    for (const item of items) {
      if (!item.name || !item.price || !item.color || !item.duration) {
        return res.status(400).json({ message: "Missing fields in one or more bikes" });
      }
    }

    const savedBikes = await Bike.insertMany(items);
    res.status(201).json(savedBikes);
  } catch (error) {
    console.error("POST /bike/add error:", error);
    res.status(500).json({ message: "Failed to create bikes", error: error.message });
  }
};

// PUT /api/bike/status/:id
export const updateBikeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    if (!status) {
      return res.status(400).json({ message: "Missing status" });
    }

    const updated = await Bike.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("PUT /status/:id error:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

// DELETE /api/bike/:id
export const deleteBike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid bike ID" });
    }

    const deleted = await Bike.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json({ message: "Bike deleted successfully" });
  } catch (error) {
    console.error("DELETE /:id error:", error);
    res.status(500).json({ message: "Failed to delete bike", error: error.message });
  }
};
