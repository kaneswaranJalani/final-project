import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bicycleId: {
    name: String,
    brand: String,
    model: String
  },
  rentalType: String, // 'hourly' or 'daily'
  startDate: Date,
  endDate: Date,
  duration: Number,
  totalAmount: Number,
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Rental', rentalSchema);
