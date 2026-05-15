import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true
  },

  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalGuests: {
    type: Number,
    required: true
  },

  totalPrice: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },

  bookingStatus: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed"
  },

}, {timestamps: true});

const Booking = mongoose.models.booking || mongoose.model("Booking", bookingSchema);

export default Booking;