import Review from "../models/Review.js";
import Hotel from "../models/Hotel.js";


// Create review
export const createReview = async (req, res) => {
  try {

    const {hotelId, rating, comment} = req.body;

    // Check existing review
    const existingReview = await Review.findOne(
      {
        user: req.user._id,
        hotel: hotelId
      }
    );

    if(existingReview) {
      return res.status(400).json({
        message: "You already reviewed this hotel"
      });
    }


    // Create review
    const newReview = await Review({
      user: req.user._id,
      hotel: hotelId,
      rating, 
      comment
    });

    const review = await newReview.save();


    // Update hotel average rating
    const reviews = await Review.find({hotel: hotelId});

    const averageRating = reviews.reduce(
      (acc, item) => acc + item.rating, 0
    ) / reviews.length;


    // Save rating in hotel
    await Hotel.findByIdAndUpdate(
      hotelId, 
      {
        averageRating,
      }
    );

    res.status(200).json(review);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};


// Get hotel reviews
export const getHotelReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      hotel: req.params.hotelId
    })
    .populate("user", "name")
    .sort({createdAt: -1});

    res.status(200).json(reviews);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};