import api from "./api";


// Get All Hotels
export const getAllHotels = async () => {
  const response = await api.get("/hotels");

  return response.data;
};


// Get Single Hotel
export const getHotelById = async (hotelId) => {
  const response = await api.get(`/hotels/${hotelId}`);

  return response.data;
};