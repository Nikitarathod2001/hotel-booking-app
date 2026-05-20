import express from "express";
import { stripeWebhook } from "../controllers/webhookController.js";



const webhookRouter = express.Router();

webhookRouter.post("/stripe", stripeWebhook);

export default webhookRouter;