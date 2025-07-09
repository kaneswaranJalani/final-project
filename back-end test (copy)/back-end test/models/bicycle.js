// models/Bicycle.js
import mongoose from 'mongoose';

const bicycleSchema = new mongoose.Schema({
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
  type: String,
  model: String,
  price: Number,
  stock: Number,
  status: { type: String, enum: ['Available', 'Low Stock', 'Out of Stock'], default: 'Available' },
  lastUpdate: { type: Date, default: Date.now },
});

export default mongoose.model('Bicycle', bicycleSchema);
