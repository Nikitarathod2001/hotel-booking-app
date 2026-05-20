import express from "express";
import cors from "cors";
import router from "./src/routes/authRoute.js";
import hotelRouter from "./src/routes/hotelRoute.js";
import bookingRouter from "./src/routes/bookingRoute.js";
import paymentRouter from "./src/routes/paymentRoute.js";
import webhookRouter from "./src/routes/webhookRoute.js";


const app = express();


// middlewares
app.use(cors());

app.use(
  "/api/webhooks/stripe",
  express.raw({
    type: "application/json",
  }) 
);

app.use("/api/webhooks", webhookRouter);

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hotel Booking App is running");
});


// routes
app.use("/api/auth", router);
app.use("/api/hotels", hotelRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);


export default app;