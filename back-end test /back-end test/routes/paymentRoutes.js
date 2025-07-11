import express from "express";
import {
  savePayment,
  getAllPayments,
  updatePaymentStatus,
  deletePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/save", savePayment);
router.get("/all", getAllPayments);
router.put("/status/:id", updatePaymentStatus);
router.delete("/:id", deletePayment);

export default router;
