import express from "express";
import { createBooking, getMyBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";


const bookingRouter = express.Router();

bookingRouter.post("/", protect, createBooking);
bookingRouter.get("/my-bookings", protect, getMyBookings);


export default bookingRouter;