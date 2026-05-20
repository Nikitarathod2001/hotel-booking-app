import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import { toggleWishlist, getWishlist } from "../controllers/wishlistController.js";


const wishlistRouter = express.Router();

wishlistRouter.post("/toggle", protect, toggleWishlist);
wishlistRouter.get("/", protect, getWishlist);


export default wishlistRouter;