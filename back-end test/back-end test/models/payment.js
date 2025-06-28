import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  bikeName: { type: String, required: true },
  amount: { type: String, required: true },
  color: { type: String, required: true },
  status: { type: String, default: "Pending" },
  paidAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
