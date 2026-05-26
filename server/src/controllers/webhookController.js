import stripe from "../config/stripe.js";
import Booking from "../models/Booking.js";


export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }


  // Payment success
  if(event.type === "checkout.session.completed") {
    try {

      const session = event.data.object;
      const bookingId = session.metadata.bookingId;

      await Booking.findByIdAndUpdate(
        bookingId,
        {
          isPaid: true,
          paymentStatus: "paid",
          paymentIntentId: session.payment_intent,
        }
      );

      console.log("Booking payment updated");
      
    } catch (error) {
      console.log(error);
    }
  }

  res.status(200).json({
    received: true
  });
};