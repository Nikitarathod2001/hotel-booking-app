import User from "../models/User.js";


// Add/remove wishlist
export const toggleWishlist = async (req, res) => {
  try {

    const userId = req.user._id;
    const {hotelId} = req.body;

    const user = await User.findById(userId);

    // Already exists
    const alreadyExists = user.wishlist.includes(hotelId);

    if(alreadyExists) {
      // Remove
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== hotelId
      );
    }
    else {
      // Add
      user.wishlist.push(hotelId);
    }

    await user.save();

    res.status(200).json({
      message: alreadyExists ? "Removed from wishlist" : "Added to wishlist",
      wishlist: user.wishlist,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


// Get wishlist
export const getWishlist = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json(user.wishlist);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};