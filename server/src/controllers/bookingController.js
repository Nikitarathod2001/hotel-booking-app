import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";


// Create booking
export const createBooking = async (req, res) => {
  try {

    const {hotelId, checkInDate, checkOutDate, totalGuests} = req.body;

    // Find hotel
    const hotel = await Hotel.findById(hotelId);

    if(!hotel) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    // Calculate days
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Validate dates
    if(checkIn >= checkOut) {
      return res.status(400).json({
        message: "Check-out date must be after check-in date"
      });
    }

    // Check overlapping bookings
    const existingBooking = await Booking.findOne({
      hotel: hotelId,
      bookingStatus: "confirmed",
      $or: [
        {
          checkInDate: {
            $lt: checkOut,
          },

          checkOutDate: {
            $gt: checkIn,
          },
        },
      ],
    });

    // If booking conflict exists
    if(existingBooking) {
      return res.status(400).json({
        message: "Hotel is already booked for selected dates"
      });
    }

    // Calculate total days
    const totalDays = (checkOut - checkIn) / (1000 * 60 * 60 *24);

    // Total price
    const totalPrice = totalDays * hotel.pricePerNight;

    // Create booking
    const newBooking = new Booking({
      user: req.user._id,
      hotel: hotelId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalPrice
    });

    const booking = await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


// Get user bookings
export const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user._id
    })
    .populate("hotel")
    .sort({createdAt: -1});

    res.status(200).json(bookings);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};