import express from "express";
import mongoose from "mongoose";
import Bike from "../models/bike.js";

const router = express.Router();

// ✅ Get all bikes/orders
router.get("/all", async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    console.error("GET /all error:", error);
    res.status(500).json({ message: "Failed to fetch bikes" });
  }
});

// ✅ Create a new bike/order
router.post("/add", async (req, res) => {
  try {
    const { name, price, color, category, status } = req.body;

    if (!name || !price || !color ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBike = new Bike({
      name,
      price,
      color,
    //   category,
      status: status || "Pending",
    });

    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (error) {
    console.error("POST /add error:", error);
    res.status(500).json({ message: "Failed to create bike", error: error.message });
  }
});

// ✅ Update bike/order status
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    if (!status) {
      return res.status(400).json({ message: "Missing status" });
    }

    const updated = await Bike.findByIdAndUpdate(
      req.params.id,
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
});

export default router;
