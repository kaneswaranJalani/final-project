import express from "express";
import Payment from "../models/payment.js";

const router = express.Router();

// Save a new payment
router.post("/save", async (req, res) => {
  try {
    const { bikeName, amount, color, status } = req.body;
    const newPayment = new Payment({ bikeName, amount, color, status: status || "Paid" });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(500).json({ message: "Failed to save payment" });
  }
});

// Get all payments
router.get("/all", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch {
    res.status(500).json({ message: "Failed to fetch payments" });
  }
});

// Update payment status
router.put("/status/:id", async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update payment status" });
  }
});

export default router;
