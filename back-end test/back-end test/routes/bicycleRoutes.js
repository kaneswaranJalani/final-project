import express from "express";
import {
  addBicycle,
  getBicyclesByPartner,
  deleteBicycle,
  submitPartnerData,
} from "../controllers/bicycleController.js";

const router = express.Router();

router.post("/add", addBicycle);
router.get("/partner/:partnerId", getBicyclesByPartner);
router.delete("/:id", deleteBicycle);
router.post("/submit", submitPartnerData); // Optional: Submit partner+bicycles together

export default router;
