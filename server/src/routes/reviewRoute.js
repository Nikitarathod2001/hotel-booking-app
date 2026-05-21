import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {createReview, getHotelReviews} from "../controllers/reviewController.js";


const reviewRouter = express.Router();

reviewRouter.post("/", protect, createReview);
reviewRouter.get("/:hotelId", getHotelReviews);

export default reviewRouter;