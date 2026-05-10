import express from "express";
import cors from "cors";
import router from "./src/routes/authRoute.js";


const app = express();


// middlewares
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hotel Booking App is running");
});


// routes
app.use("/api/auth", router);


export default app;