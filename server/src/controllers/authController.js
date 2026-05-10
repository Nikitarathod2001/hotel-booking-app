import User from "../models/User.js";


export const registerUser = async (req, res) => {
  try {

    const {name, email, password} = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({
        message: "User already exist with this email ID"
      });
    }

    const newUser = await User({name, email, password});
    await newUser.save();

    const user = await User.findOne({email}).select("-password");

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};