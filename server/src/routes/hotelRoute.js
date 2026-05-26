import express from "express";

import { addHotel, getHotelById, getHotels, updateHotel, deleteHotel } from "../controllers/hotelController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";


const hotelRouter = express.Router();

hotelRouter.post("/", protect, adminOnly, upload.single("image"), addHotel);
hotelRouter.get("/", getHotels);
hotelRouter.get("/:id", getHotelById);
hotelRouter.put("/:id", protect, adminOnly, upload.single("image") ,updateHotel);
hotelRouter.delete("/:id", protect, adminOnly, deleteHotel);


export default hotelRouter;