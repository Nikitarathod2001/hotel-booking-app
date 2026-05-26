import React from 'react';
import PaymentButton from './PaymentButton';


const BookingCard = ({booking}) => {
  return (
    <div className='bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition duration-300'>

      <div className='grid grid-cols-1 md:grid-cols-3'>

        <div className='overflow-hidden'>

          <img src={booking.hotel.image} alt={booking.hotel.name} 
            className='w-full h-full object-cover mid:h-[320px] hover:scale-105 transition duration-500'
          />

        </div>

        <div className='md:col-span-2 p-8'>

          <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8'>

            <div>

              <h2 className='text-3xl font-bold text-[#001F6B] mb-3'>
                {booking.hotel.name}
              </h2>

              <p className='text-slate-500 text-lg'>
                {booking.hotel.location}
              </p>

            </div>

            <div className={`px-4 py-2 rounded-2xl text-sm font-semibold whitespace-nowrap 
            ${
              booking.bookingStatus === "confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
            }`}>
              {booking.bookingStatus}
            </div>

          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8'>

            <div className='bg-slate-50 rounded-2xl p-5'>

              <p className='text-sm text-slate-500 mb-2'>
                Check-In
              </p>

              <p className='text-lg font-semibold text-slate-900'>
                {
                  new Date(booking.checkInDate).toLocaleDateString()
                }
              </p>

            </div>

            <div className='bg-slate-50 rounded-2xl p-5'>

              <p className='text-sm text-slate-500 mb-2'>
                Check-Out
              </p>

              <p className='text-lg font-semibold text-slate-900'>
                {
                  new Date(booking.checkOutDate).toLocaleDateString()
                }
              </p>

            </div>

            <div className='bg-slate-50 rounded-2xl p-5'>

              <p className='text-sm text-slate-500 mb-2'>
                Guests
              </p>

              <p className='text-lg font-semibold text-slate-900'>
                {booking.totalGuests}
              </p>

            </div>

            <div className='bg-slate-50 rounded-2xl p-5'>

              <p className='text-sm text-slate-500 mb-2'>
                Total Price
              </p>

              <p className='text-lg font-semibold text-slate-900'>
                &#8377;
                {booking.totalPrice}
              </p>

            </div>

          </div>

          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-200 pt-6'>

            <div>

              <p className='text-sm text-slate-500 mb-1'>
                Payment Status
              </p>

              <div className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold
              ${
                booking.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}>
                {
                  booking.isPaid ? "Paid" : "Pending Payment"
                }
              </div>

            </div>

            {
              !booking.isPaid && (
                <div className='w-full sm:w-auto'>

                  <PaymentButton bookingId={booking._id}/>

                </div>
              )
            }

          </div>

        </div>

      </div>

    </div>
  )
}

export default BookingCard
