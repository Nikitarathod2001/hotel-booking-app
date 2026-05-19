import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { createCheckoutSession } from "../controllers/paymentController.js";


const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", protect, createCheckoutSession);


export default paymentRouter;