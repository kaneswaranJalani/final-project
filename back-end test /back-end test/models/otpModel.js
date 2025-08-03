import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 mins
});

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
export default OTP;
