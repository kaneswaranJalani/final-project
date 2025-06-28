import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      primaryPhone,
      secondaryPhone,
      address,
      idProof,
      rentalPreferences
    } = req.body;

    // Check for missing fields
    if (
      !firstName || !lastName || !email || !password ||
      !primaryPhone || !address || !idProof
    ) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      primaryPhone,
      secondaryPhone,
      address,
      idProof,
      rentalPreferences
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
