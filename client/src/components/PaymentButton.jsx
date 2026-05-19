import React from 'react';
import toast from 'react-hot-toast';
import { createCheckoutSession } from '../services/paymentService';


const PaymentButton = ({bookingId}) => {

  const handlePayment = async () => {
    try {

      const data = await createCheckoutSession(bookingId);
      window.location.href = data.url;
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  return (
    <button onClick={handlePayment}>
      Pay Now
    </button>
  )
}

export default PaymentButton
