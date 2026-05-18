import api from "./api";


export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");

  return response.data;
};