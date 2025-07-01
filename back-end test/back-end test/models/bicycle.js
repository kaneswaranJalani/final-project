import mongoose from 'mongoose';

const bicycleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Pending' },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model('Bicycle', bicycleSchema);
