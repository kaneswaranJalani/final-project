import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  primaryPhone: String,
  secondaryPhone: String,
  address: String,
  idProof: String,
  rentalPreferences: [String],
  role: {
    type: String,
    enum: ['user', 'partner', 'admin'], // make sure these match what you pass from frontend
    default: 'user',
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
