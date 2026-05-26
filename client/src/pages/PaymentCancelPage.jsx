import React from 'react';
import {Link} from "react-router-dom";

const PaymentCancelPage = () => {
  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4'>
      
      <div className='w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center'>

        <div className='w-24 h-24 mx-auto mb-8 rounded-full bg-red-500 text-white flex items-center justify-center text-5xl'>
          ✕
        </div>

        <h1 className='text-4xl font-bold text-[#001F6B] mb-4'>
          Payment Cancelled
        </h1>

        <p className='text-slate-600 text-lg leading-relaxed mb-8'>
          Your payment was not completed.
          You can try again anytime to confirm your booking.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>

          <Link to="/bookings"
            className='w-full sm:w-auto bg-[#001F6B] hover:bg-[#001F6B]/80 text-white px-6 py-3 rounded-2xl font-semibold transition duration-200'
          >
            Retry Payment
          </Link>

          <Link to="/"
            className='w-full sm:w-auto border border-slate-300 hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-2xl font-semibold transition duration-200'
          >
            Explore Hotels
          </Link>

        </div>

      </div>

    </div>
  )
}

export default PaymentCancelPage
