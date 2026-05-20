import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";


export const getAdminStats = async (req, res) => {
  try {

    const totalHotels = await Hotel.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();

    // Paid bookings only
    const paidBookings = await Booking.find({isPaid: true});

    // Revenue
    const totalRevenue = paidBookings.reduce(
      (acc, booking) => acc + booking.totalPrice, 0
    );

    res.status(200).json({
      totalHotels,
      totalBookings,
      totalUsers,
      totalRevenue
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};