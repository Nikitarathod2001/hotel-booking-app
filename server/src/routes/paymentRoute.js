import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { createPaymentIntent } from "../controllers/paymentController.js";


const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", protect, createPaymentIntent);


export default paymentRouter;