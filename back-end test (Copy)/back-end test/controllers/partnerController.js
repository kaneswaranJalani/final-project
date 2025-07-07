// controllers/partnerController.js
import Partner from "../models/Partner.js";
import bcrypt from "bcryptjs";

export const registerPartner = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      nic,
      address,
      password,
      businessName,
      businessType,
      yearsInBusiness,
      rentalArea,
      additionalDetails,
      partnerTier,
    } = req.body;

    const existing = await Partner.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered as a partner" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = new Partner({
      name,
      email,
      phone,
      nic,
      address,
      password: hashedPassword,
      businessName,
      businessType,
      yearsInBusiness,
      rentalArea,
      additionalDetails,
      partnerTier,
    });

    await newPartner.save();
    res.status(201).json({ message: "Partner registered successfully", partnerId: newPartner._id });
  } catch (err) {
    console.error("Partner registration error:", err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Update partner profile info (PUT)
export const updatePartner = async (req, res) => {
  try {
    // For security, get partnerId from authenticated request context or token
    // Here, assuming partnerId sent in req.body for simplicity (replace with auth middleware in production)
    const { partnerId, name, email, phone, nic, address, businessName, businessType, yearsInBusiness, rentalArea, additionalDetails, partnerTier } = req.body;

    if (!partnerId) {
      return res.status(400).json({ message: "partnerId is required" });
    }

    // Optional: If email is being updated, check uniqueness
    if (email) {
      const existingPartner = await Partner.findOne({ email, _id: { $ne: partnerId } });
      if (existingPartner) {
        return res.status(400).json({ message: "Email already in use by another partner" });
      }
    }

    const updatedPartner = await Partner.findByIdAndUpdate(
      partnerId,
      {
        name,
        email,
        phone,
        nic,
        address,
        businessName,
        businessType,
        yearsInBusiness,
        rentalArea,
        additionalDetails,
        partnerTier,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.json({ message: "Partner updated successfully", updatedPartner });
  } catch (error) {
    console.error("Update partner error:", error);
    res.status(500).json({ message: "Failed to update partner", error: error.message });
  }
};
