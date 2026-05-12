import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async (req, res, next) => {
  try {

    let token;

    // Check token exists
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    }
    else {
      return res.status(401).json({
        message: "Not authorized, token missing"
      });
    }
    
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Not authorized, token failed"
    });
  }
};