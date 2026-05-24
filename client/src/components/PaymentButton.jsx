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
    <button onClick={handlePayment}
      className='w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold text-base transition duration-200 shadow-sm hover:shadow-lg active:scale-[0.98]'
    >
      Pay Now
    </button>
  )
}

export default PaymentButton
