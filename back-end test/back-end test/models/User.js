import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  primaryPhone: { type: String, required: true },
  secondaryPhone: { type: String },
  address: { type: String, required: true },
  idProof: { type: String, required: true },
  rentalPreferences: [String],
  role: { type: String, default: "user" }
});

const User = mongoose.model("User", userSchema);
export default User;
