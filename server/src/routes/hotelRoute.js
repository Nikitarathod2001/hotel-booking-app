import express from "express";

import { createHotel, getHotelById, getHotels, updateHotel, deleteHotel } from "../controllers/hotelController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";


const hotelRouter = express.Router();

hotelRouter.post("/", protect, authorize("admin"), upload.single("image"), createHotel);
hotelRouter.get("/", getHotels);
hotelRouter.get("/:id", getHotelById);
hotelRouter.put("/:id", protect, authorize("admin"), updateHotel);
hotelRouter.delete("/:id", protect, authorize("admin"), deleteHotel);


export default hotelRouter;