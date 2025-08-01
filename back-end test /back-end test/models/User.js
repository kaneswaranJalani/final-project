import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },

  primaryPhone: { type: String, required: false },
  secondaryPhone: { type: String, required: false },
  address: { type: String, required: false },
  idProof: { type: String, required: false },
  rentalPreferences: { type: String, required: false },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
