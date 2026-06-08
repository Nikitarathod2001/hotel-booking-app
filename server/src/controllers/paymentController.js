import stripe from "../config/stripe.js";

import Booking from "../models/Booking.js";


export const createCheckoutSession = async (req, res) => {
  try {

    const {bookingId} = req.body;

    // Find booking
    const booking = await Booking.findById(bookingId).populate("hotel");


    if(!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],

        mode: "payment",

        line_items: [
          {
            price_data: {
              currency: "inr",

              product_data: {
                name: booking.hotel.name,
              },

              unit_amount: booking.totalPrice * 100,
            },

            quantity: 1,
          },
        ],

        success_url: "stayfinder-beryl.vercel.app/payment-success",
        cancel_url: "stayfinder-beryl.vercel.app/payment-cancel",

        metadata: {
          bookingId: booking._id.toString(),
        },
      }
    );

    res.status(200).json({
      url: session.url,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};