import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


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
    console.log(error);
    return res.status(500).json({
      message: error.message
    });
  }
};


export const loginUser = async (req, res) => {
  try {

    const {email, password} = req.body;

    // Validation
    if(!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check user
    const user = await User.findOne({email});

    if(!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    // Compare Password
    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


export const getMe = async (req, res) => {
  try {

    res.status(200).json(req.user);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


export const adminDashboard = async (req, res) => {
  try {

    res.status(200).json({
      message: `Welcome Admin ${req.user.name}`
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};