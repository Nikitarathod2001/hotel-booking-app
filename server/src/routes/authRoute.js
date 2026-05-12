import express from "express";
import { adminDashboard, getMe, loginUser, registerUser } from "../controllers/authController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/admin", protect, authorize("admin"), adminDashboard);

export default router;