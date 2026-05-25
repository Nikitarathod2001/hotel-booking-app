import React from 'react';
import {Link} from "react-router-dom";


const PaymentSuccessPage = () => {
  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4'>
      
      <div className='w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center'>

        <div className='w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center text-5xl'>
          ✅
        </div>

        <h1 className='text-4xl font-bold text-slate-900 mb-4'>
          Payment Successful
        </h1>

        <p>
          Your booking has been confirmed successfully.
          We hope you enjoy your stay and have a wonderful experience.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>

          <Link to="/bookings"
            className='w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold transition duration-200'
          >
            View My Bookings
          </Link>

          <Link to="/"
            className='w-full sm:w-auto border border-slate-300 hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-2xl font-semibold transition duration-200'
          >
            Explore More Hotels
          </Link>

        </div>

      </div>

    </div>
  )
}

export default PaymentSuccessPage
