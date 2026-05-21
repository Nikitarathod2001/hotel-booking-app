import api from "./api";


// Get All Hotels
export const getAllHotels = async (params) => {
  const response = await api.get("/hotels", {params});

  return response.data;
};


// Get Single Hotel
export const getHotelById = async (hotelId) => {
  const response = await api.get(`/hotels/${hotelId}`);

  return response.data;
};


// Create Hotel
export const createHotel = async (hotelData) => {
  const response = await api.post("/hotels", hotelData);

  return response.data;
};


// Update Hotel
export const updateHotel = async (id, hotelData) => {
  const response = await api.put(`/hotels/${id}`, hotelData);

  return response.data;
};


// Delete Hotel
export const deleteHotel = async (id) => {
  const response = await api.delete(`/hotels/${id}`);

  return response.data;
};