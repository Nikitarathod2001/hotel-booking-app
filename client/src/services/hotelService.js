import api from "./api";


// Get All Hotels
export const getAllHotels = async () => {
  const response = await api.get("/hotels");

  return response.data;
};