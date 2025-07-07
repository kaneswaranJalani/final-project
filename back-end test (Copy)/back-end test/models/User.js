// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // From old schema
  name: { type: String },

  // From your registration form
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  primaryPhone: { type: String },
  secondaryPhone: { type: String },
  address: { type: String },
  idProof: { type: String },
  rentalPreferences: [String],

  // User role (default = "user")
  role: { type: String, default: "user" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
