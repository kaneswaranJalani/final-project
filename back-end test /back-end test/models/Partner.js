import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  nic: { type: String, required: true },
  address: { type: String, required: true },
  businessName: { type: String },
  businessType: { type: String },
  yearsInBusiness: { type: Number },
  rentalArea: { type: String },
  additionalDetails: { type: String },
  partnerTier: { type: String },

  role: { type: String, default: "partner" },
}, { timestamps: true });

// ✅ Correct model name and schema
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
