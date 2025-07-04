// models/Partner.js
import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "partner" },

  // Extended Info from PartnerRegister form
  phone: { type: String, required: true },
  nic: { type: String, required: true },
  address: { type: String, required: true },

  businessName: { type: String },
  businessType: { type: String },
  yearsInBusiness: { type: Number },
  rentalArea: { type: String },
  additionalDetails: { type: String },
  partnerTier: { type: String }
}, { timestamps: true });

export default mongoose.model("Partner", partnerSchema);
