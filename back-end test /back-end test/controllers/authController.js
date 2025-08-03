import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Partner from '../models/Partner.js';
// import Admin from '../models/Admin.js'; // if you have Admin model


// ✅ Register - User
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      primaryPhone,
      secondaryPhone,
      address,
      idProof,
      rentalPreferences
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      primaryPhone,
      secondaryPhone,
      address,
      idProof,
      rentalPreferences
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully. Please verify your phone via OTP.",
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Register - Partner
export const registerPartner = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      nic,
      businessType,
      businessName,
      rentalArea,
      yearsInBusiness,
      additionalDetails,
      partnerTier,
      primaryPhone,
      secondaryPhone
    } = req.body;

    const exists = await Partner.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const partner = new Partner({
      name,
      email,
      password: hashed,
      phone,
      primaryPhone,
      secondaryPhone,
      nic,
      address,
      businessName,
      businessType,
      yearsInBusiness,
      rentalArea,
      additionalDetails,
      partnerTier,
      role: "partner"
    });

    await partner.save();
    res.status(201).json({ message: "Partner registered", partner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Login - Shared for User & Partner
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists in User collection
//     let account = await User.findOne({ email });
//     let role = "user";

//     // If not, check Partner collection
//     if (!account) {
//       account = await Partner.findOne({ email });
//       role = "partner";
//     }

//     if (!account) return res.status(404).json({ message: "Account not found" });

//     const isMatch = await bcrypt.compare(password, account.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: account._id, role },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: account._id,
//         name: account.name,
//         email: account.email,
//         role,
//         ...(role === "partner" && {
//           phone: account.phone,
//           primaryPhone: account.primaryPhone,
//           secondaryPhone: account.secondaryPhone,
//           businessName: account.businessName,
//           businessType: account.businessType,
//           yearsInBusiness: account.yearsInBusiness,
//           rentalArea: account.rentalArea,
//           additionalDetails: account.additionalDetails,
//           partnerTier: account.partnerTier,
//         }),
//         ...(role === "user" && {
//           primaryPhone: account.primaryPhone,
//           secondaryPhone: account.secondaryPhone,
//           address: account.address,
//           idProof: account.idProof,
//           rentalPreferences: account.rentalPreferences,
//         }),
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let account = await User.findOne({ email });
    let role = null;

    if (account) {
      role = 'user';
    } else {
      account = await Partner.findOne({ email });
      if (account) {
        role = 'partner';
      } else {
        account = await Admin.findOne({ email });
        if (account) role = 'admin';
      }
    }

    if (!account) {
      console.log(`Login failed: No account found with email ${email}`);
      return res.status(404).json({ message: "Account not found" });
    }

    if (role === 'partner' && !account.verified) {
      return res.status(403).json({ message: "Your account is not verified by admin yet." });
    }

    if (!account.password) {
      console.log(`Login failed: Password missing for email ${email}`);
      return res.status(400).json({ message: "Invalid account credentials" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET not defined");
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign({ id: account._id, role }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
        role,
        ...(role === "admin" && { admin: true }),
        ...(role === "partner" && {
          phone: account.phone,
          nic: account.nic,
          address: account.address,
          businessName: account.businessName,
          businessType: account.businessType,
          yearsInBusiness: account.yearsInBusiness,
          rentalArea: account.rentalArea,
          additionalDetails: account.additionalDetails,
          partnerTier: account.partnerTier,
        }),
        ...(role === "user" && {
          primaryPhone: account.primaryPhone,
          secondaryPhone: account.secondaryPhone,
          address: account.address,
          idProof: account.idProof,
          rentalPreferences: account.rentalPreferences,
          isVerified: account.isVerified,
        }),
      },
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Update role
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
// export const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // Update user by ID
// export const updateUserById = async (req, res) => {
//   try {
//     const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated) return res.status(404).json({ error: "User not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };
