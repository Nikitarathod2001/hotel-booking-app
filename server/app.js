import express from "express";
import cors from "cors";
import router from "./src/routes/authRoute.js";
import hotelRouter from "./src/routes/hotelRoute.js";


const app = express();


// middlewares
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hotel Booking App is running");
});


// routes
app.use("/api/auth", router);
app.use("/api/hotels", hotelRouter);


export default app;