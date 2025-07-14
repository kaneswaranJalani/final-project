import Partner from "../models/Partner.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getUnverifiedPartners = async (req, res) => {
    try {
      const pendingPartners = await Partner.find({ verified: false });
      res.status(200).json(pendingPartners);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const verifyPartner = async (req, res) => {
    try {
      const { id } = req.params;
      const partner = await Partner.findByIdAndUpdate(id, {
        verified: true,
        statusReason: "Approved by admin"
      }, { new: true });
  
      if (!partner) return res.status(404).json({ message: "Partner not found" });
  
      // ✅ Send verification email
      await sendEmail({
        to: partner.email,
        subject: "Your Partner Account Has Been Approved!",
        text: `Hi ${partner.name}, your partner account has been verified. You can now login and access features.`,
      });
  
      res.status(200).json({ message: "Partner verified and email sent", partner });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const rejectPartner = async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;
  
      const deleted = await Partner.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Partner not found" });
  
      // Send rejection email
      await sendEmail({
        to: deleted.email,
        subject: "Partner Account Rejected",
        text: `Hi ${deleted.name}, your registration has been declined. Reason: ${reason || "Not specified"}.`,
      });
  
      res.status(200).json({ message: "Partner rejected and removed" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  