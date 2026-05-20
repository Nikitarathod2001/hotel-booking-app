import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getAdminStats } from "../controllers/adminController.js";


const adminRouter = express.Router();


adminRouter.get("/stats", protect, adminOnly, getAdminStats);

export default adminRouter;