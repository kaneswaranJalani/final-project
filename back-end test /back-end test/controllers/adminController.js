// import Partner from "../models/Partner.js";
// import { sendEmail } from "../utils/sendEmail.js";

// export const getUnverifiedPartners = async (req, res) => {
//     try {
//       const pendingPartners = await Partner.find({ verified: false });
//       res.status(200).json(pendingPartners);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

//   export const verifyPartner = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const partner = await Partner.findByIdAndUpdate(id, {
//         verified: true,
//         statusReason: "Approved by admin"
//       }, { new: true });
  
//       if (!partner) return res.status(404).json({ message: "Partner not found" });
  
//       // ✅ Send verification email
//       await sendEmail({
//         to: partner.email,
//         subject: "Your Partner Account Has Been Approved!",
//         text: `Hi ${partner.name}, your partner account has been verified. You can now login and access features.`,
//       });
  
//       res.status(200).json({ message: "Partner verified and email sent", partner });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
  
//   export const rejectPartner = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { reason } = req.body;
  
//       const deleted = await Partner.findByIdAndDelete(id);
//       if (!deleted) return res.status(404).json({ message: "Partner not found" });
  
//       // Send rejection email
//       await sendEmail({
//         to: deleted.email,
//         subject: "Partner Account Rejected",
//         text: `Hi ${deleted.name}, your registration has been declined. Reason: ${reason || "Not specified"}.`,
//       });
  
//       res.status(200).json({ message: "Partner rejected and removed" });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
  
import Partner from '../models/Partner.js';
import nodemailer from 'nodemailer';

// Email config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourmail@gmail.com', // replace with your email
    pass: 'yourpassword'        // replace with your app password
  }
});

// ✅ Verify/Reject Partner
export const verifyPartner = async (req, res) => {
  const { partnerId } = req.params;
  const { status } = req.body;

  try {
    console.log('Received verification request for:', partnerId, 'Status:', status);

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      console.log('Partner not found');
      return res.status(404).json({ message: 'Partner not found' });
    }

    partner.status = status;
    await partner.save();
    console.log(`Partner status updated to: ${status}`);

    let subject = '';
    let text = '';

    if (status === 'approved') {
      subject = 'Your Partner Request is Approved';
      text = `Hi ${partner.name},\n\nCongratulations! Your request has been approved. You can now access your dashboard.\n\n- RideLoop Team`;
    } else if (status === 'rejected') {
      subject = 'Your Partner Request is Rejected';
      text = `Hi ${partner.name},\n\nWe regret to inform you that your request has been rejected.\n\n- RideLoop Team`;
    } else {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const mailResponse = await transporter.sendMail({
      from: 'yourmail@gmail.com',
      to: partner.email,
      subject,
      text,
    });

    console.log('Email sent:', mailResponse.response);

    res.json({ message: `Partner ${status} and notified via email.` });
  } catch (err) {
    console.error('Error in verifyPartner:', err);
    res.status(500).json({ message: 'Error verifying partner' });
  }
};

// 🔁 Get all partners
export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch partners' });
  }
};


