import api from "./api";


// Toggle wishlist
export const toggleWishlist = async (hotelId) => {
  const response = await api.post("/wishlist/toggle", {hotelId});
  
  return response.data;
};


// Get wishlist
export const getWishlist = async () => {
  const response = await api.get("/wishlist");

  return response.data;
};