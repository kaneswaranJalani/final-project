import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import OTP from '../models/otpModel.js';

// Send OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false });

  // Save OTP to DB
  await OTP.create({ email, otp });

  // Send Email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `RideLoop <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).json({ message: "Failed to send OTP", error });
    res.status(200).json({ message: "OTP sent successfully" });
  });
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const existing = await OTP.findOne({ email, otp });

  if (!existing) return res.status(400).json({ message: "Invalid or expired OTP" });

  await OTP.deleteMany({ email }); // Clear used OTPs

  res.status(200).json({ message: "OTP verified successfully" });
};
