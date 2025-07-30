// import express from "express";
// import {
//   getUnverifiedPartners,
//   verifyPartner,
//   rejectPartner
// } from "../controllers/adminController.js";
// import { getAllPartners } from "../controllers/partnerController.js";

// const router = express.Router();

// router.get("/partners/pending", getUnverifiedPartners);
// router.put("/partners/verify/:id", verifyPartner);
// router.delete("/partners/reject/:id", rejectPartner);
// router.get("/partners/all" , getAllPartners)

// export default router;


import express from 'express';
import { getAllPartners, verifyPartner } from '../controllers/adminController.js';

const router = express.Router();

router.get('/partners/all', getAllPartners);
router.put('/partners/verify/:partnerId', verifyPartner);

export default router;
