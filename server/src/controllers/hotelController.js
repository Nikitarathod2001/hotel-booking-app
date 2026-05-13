import Hotel from "../models/Hotel.js";


// Create Hotel
export const createHotel = async (req, res) => {
  try {

    const {name, location, description, pricePerNight, image, amenities} = req.body;

    const newHotel = await Hotel({
      name, location, description, pricePerNight, image, 
      amenities,
      createdBy: req.user._id
    });

    const hotel = await newHotel.save();

    res.status(201).json({
      message: "Hotel created successfully",
      hotel
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


// Get all hotels
export const getHotels = async (req, res) => {
  try {

    const hotels = await Hotel.find().populate(
      "createdBy",
      "name email"
    );

    res.status(200).json(hotels);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


// Get single hotel
export const getHotelById = async (req, res) => {
  try {

    const hotel = await Hotel.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    res.status(200).json(hotel);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


// Update hotel
export const updateHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findById(req.params.id);

    if(!hotel) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.status(200).json({
      message: "Hotel updated successfully",
      updatedHotel
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


// Delete hotel
export const deleteHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findById(req.params.id);

    if(!hotel) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    await hotel.deleteOne();

    res.status(200).json({
      message: "Hotel deleted successfully"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};