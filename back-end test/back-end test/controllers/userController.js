import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (req, res) => {
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
      rentalPreferences,
    } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
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
      rentalPreferences,
      role: "user"  // default role
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Get all users (exclude password)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// Update user role by ID
export const updateUserRole = async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  if (!["user", "partner", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user role", error: err.message });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};
