import mongoose from "mongoose";


const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  location: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  pricePerNight: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  amenities: {
    type: [String],
    default: []
  },

  rating: {
    type: Number,
    default: 0
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true});


const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);


export default Hotel;