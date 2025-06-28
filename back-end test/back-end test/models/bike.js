import mongoose from "mongoose";

const selectedBikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  color: { type: String, required: true },
//   date: { type: Date, default: Date.now }
});

export default mongoose.model("SelectedBike", selectedBikeSchema);
