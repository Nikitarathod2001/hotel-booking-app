import api from "./api";


// Create review
export const createReview = async (reviewData) => {
  const response = await api.post("/reviews", reviewData);

  return response.data;
};


// Get hotel reviews
export const getHotelReviews = async (hotelId) => {
  const response = await api.get(`/reviews/${hotelId}`);

  return response.data;
};