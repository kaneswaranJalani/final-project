import mongoose from 'mongoose';

const bicycleSchema = new mongoose.Schema({
  brand: { 
    type: String, 
    required: [true, 'Brand is required'] 
  },
  model: { 
    type: String, 
    required: [true, 'Model is required'] 
  },
  color: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'] 
  },
  gearCount: { 
    type: Number 
  },
  orderTime: { 
    type: Date, 
    default: Date.now 
  },
  returnTime: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['Available', 'Rented', 'Maintenance'], 
    default: 'Available' 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true  // ✅ recommended: user should always be linked
  }
}, { timestamps: true });

const Bicycle = mongoose.model('Bicycle', bicycleSchema);

export default Bicycle;
