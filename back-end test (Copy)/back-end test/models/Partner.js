// models/Partner.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const partnerSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'partner' },
  image: { type: String },
  
  // Contact Info
  phone: { type: String, required: true },
  address: { type: String, required: true },
  
  // Identification
  nic: { type: String, required: true },
  
  // Business Info
  businessName: { type: String, required: true },
  businessType: { type: String, required: true },
  yearsInBusiness: { type: Number },
  rentalArea: { type: String },
  additionalDetails: { type: String },
  
  // Partner Status
  partnerTier: { 
    type: String, 
    enum: ['basic', 'premium', 'enterprise'], 
    default: 'basic' 
  },
  isVerified: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['pending', 'active', 'suspended'], 
    default: 'pending' 
  },
  
  // Timestamps
  joinDate: { type: Date, default: Date.now },
  lastLogin: { type: Date }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// Password hash middleware
partnerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Password comparison method
partnerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public profile (without sensitive info)
partnerSchema.methods.getPublicProfile = function() {
  const { password, __v, ...publicData } = this.toObject();
  return publicData;
};

export default mongoose.model('Partner', partnerSchema);