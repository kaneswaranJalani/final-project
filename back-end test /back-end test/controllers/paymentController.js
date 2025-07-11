// import Payment from '../models/payment.js';


// // ✅ Create a new payment
// export const createPayment = async (req, res, next) => {
//   try {
//     const { user, order, amount, paymentMethod, status } = req.body;

//     // Validate order exists
//     const existingOrder = await Order.findById(order);
//     if (!existingOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     const payment = await Payment.create({
//       user,
//       order,
//       amount,
//       paymentMethod,
//       status: status || 'pending',
//       paymentDate: new Date()
//     });

//     res.status(201).json(payment);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };


// // ✅ Get all payments
// export const getPayments = async (req, res, next) => {
//   try {
//     const payments = await Payment.find()
//       .populate('user', 'name email') // ✅ correct field name
//       .populate('order');

//     res.json(payments);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };


// // ✅ Get payment by ID
// export const getPaymentById = async (req, res, next) => {
//   try {
//     const payment = await Payment.findById(req.params.id)
//       .populate('user', 'name email')
//       .populate('order');

//     if (!payment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }

//     res.json(payment);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };


// // ✅ Update payment status
// export const updatePaymentStatus = async (req, res, next) => {
//   try {
//     const payment = await Payment.findById(req.params.id);
//     if (!payment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }

//     payment.status = req.body.status || payment.status;
//     const updatedPayment = await payment.save();

//     res.json(updatedPayment);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };


// // ✅ Delete payment
// export const deletePayment = async (req, res, next) => {
//   try {
//     const payment = await Payment.findById(req.params.id);
//     if (!payment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }

//     await payment.deleteOne(); // ✅ correct method
//     res.json({ message: 'Payment deleted' });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };
import Payment from "../models/payment.js";

// Save a new payment
export const savePayment = async (req, res) => {
  try {
    const { bikeName, amount, color, status } = req.body;
    const newPayment = new Payment({
      bikeName,
      amount,
      color,
      status: status || "Paid",
    });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(500).json({ message: "Failed to save payment" });
  }
};

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch {
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update payment status" });
  }
};

// Delete a payment
export const deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete payment" });
  }
};
