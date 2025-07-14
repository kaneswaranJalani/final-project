import mongoose from 'mongoose';

const bicycleSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true,
  },
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  dailyRate: { type: Number, required: true },
  description: { type: String },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance'],
    default: 'available',
  },
  createdAt: { type: Date, default: Date.now },
});

const Bicycle = mongoose.model('Bicycle', bicycleSchema);
export default Bicycle;
