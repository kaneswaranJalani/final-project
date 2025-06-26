// controllers/partnerController.js
import Partner from "../models/Partner.js";
import bcrypt from "bcryptjs";

export const registerPartner = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      primaryPhone,
      secondaryPhone,
      businessAddress,
      taxId,
      availableVehicles,
      numberAvailable,
      vehicleType,
      additionalDetails,
      serviceArea,
      rentalPreferences
    } = req.body;

    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: "Partner already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = new Partner({
      name,
      lastName,
      email,
      password: hashedPassword,
      primaryPhone,
      secondaryPhone,
      businessAddress,
      taxId,
      availableVehicles,
      numberAvailable,
      vehicleType,
      additionalDetails,
      serviceArea,
      rentalPreferences
    });

    await newPartner.save();

    res.status(201).json({ message: "Partner registered successfully!" });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
