import express from "express";
import {
  getUnverifiedPartners,
  verifyPartner,
  rejectPartner
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/partners/pending", getUnverifiedPartners);
router.put("/partners/verify/:id", verifyPartner);
router.delete("/partners/reject/:id", rejectPartner);

export default router;