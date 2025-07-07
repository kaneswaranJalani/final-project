import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    category: { type: String },
    status: { type: String, default: 'Pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Bike', bikeSchema);
