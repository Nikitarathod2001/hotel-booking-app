import stripe from "../config/stripe.js";

import Booking from "../models/Booking.js";


export const createPaymentIntent = async (req, res) => {
  try {

    const {bookingId} = req.body;

    // Find booking
    const booking = await Booking.findById(bookingId);

    if(!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    // Amount in paise/cents
    const amount = booking.totalPrice * 100;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      metadata: {
        bookingId: booking._id.toString(),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};