import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    duration : { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Bike', bikeSchema);
