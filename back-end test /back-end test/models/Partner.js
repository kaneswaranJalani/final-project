// import mongoose from "mongoose";

// const partnerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true },
//   nic: { type: String, required: true },
//   address: { type: String, required: true },
//   businessName: { type: String },
//   businessType: { type: String },
//   yearsInBusiness: { type: Number },
//   rentalArea: { type: String },
//   additionalDetails: { type: String },
//   partnerTier: { type: String },
//   verified: { type: Boolean, default: false },
//   statusReason: { type: String, default: "Pending approval" },
//   role: { type: String, default: "partner" },
// }, { timestamps: true });

// // ✅ Correct model name and schema
// const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
// export default Partner;


import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  nic: String,
  businessName: String,
  businessType: String,
  rentalArea: String,
  partnerTier: String,
  yearsInBusiness: Number,
  additionalDetails: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

// ✅ Correct model name and schema
const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
export default Partner;

