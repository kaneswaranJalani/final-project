// models/Tracking.js
import mongoose from 'mongoose';

const TrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
  event: { type: String, required: true },
  metadata: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Tracking', TrackingSchema);
