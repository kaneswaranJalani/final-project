// models/Partner.js
import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  primaryPhone: String,
  secondaryPhone: String,
  businessAddress: String,
  taxId: String,
  availableVehicles: String,
  numberAvailable: Number,
  vehicleType: String,
  additionalDetails: String,
  serviceArea: String,
  rentalPreferences: [String],
}, {
  timestamps: true
});

const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;
