import api from "./api";


// Create checkout session
export const createCheckoutSession = async (bookingId) => {
  const response = await api.post("/payments/create-checkout-session", {bookingId});

  return response.data;
};