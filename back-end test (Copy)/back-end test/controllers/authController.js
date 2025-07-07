import User from "../models/User.js";
import Partner from "../models/Partner.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  let Model = role === "admin" ? Admin : role === "partner" ? Partner : User;

  try {
    const existing = await Model.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const newUser = new Model({ name, email, password: hashed });
    await newUser.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  let Model = role === "admin" ? Admin : role === "partner" ? Partner : User;

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
