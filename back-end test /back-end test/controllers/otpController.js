import OTP from '../models/otpModel.js';
import User from '../models/User.js';
import otpGenerator from 'otp-generator';

// Send OTP
export const sendOTP = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone number is required" });
  }

  const otpCode = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  await OTP.deleteMany({ phone }); // Remove previous OTPs for the phone

  const otp = new OTP({ phone, otp: otpCode });
  await otp.save();

  // Replace this with actual SMS service
  console.log(`OTP for ${phone}: ${otpCode}`);

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: "Phone and OTP are required" });
  }

  const record = await OTP.findOne({ phone, otp });

  if (!record) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  const user = await User.findOneAndUpdate(
    { primaryPhone: phone },
    { isVerified: true }
  );

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await OTP.deleteMany({ phone }); // Clear used OTPs

  res.status(200).json({
    success: true,
    message: "Phone number verified successfully",
  });
};
