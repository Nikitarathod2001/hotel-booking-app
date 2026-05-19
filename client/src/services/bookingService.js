import api from "./api";

// Get My Bookings
export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");

  return response.data;
};


// Create Booking
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);

  return response.data;
};