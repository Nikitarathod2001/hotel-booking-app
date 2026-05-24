import React, { useState } from 'react';
import { useEffect } from 'react';
import { getMyBookings } from '../services/bookingService';
import BookingCard from '../components/BookingCard';
import toast from 'react-hot-toast';
import {Link} from "react-router-dom";


const BookingsPage = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {

        setLoading(true);

        const data = await getMyBookings();
        console.log(data);
        
        setBookings(data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if(loading) {
    return (
      <p>Loading bookings...</p>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

        <div className='mb-10'>

          <h1 className='text-4xl font-bold text-slate-900 mb-3'>
            My Bookings
          </h1>

          <p className='text-slate-600 text-lg'>
            View and manage all your hotel bookings.
          </p>

        </div>

        {
          bookings.length === 0 ? (
            <div className='bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center'>

              <h2 className='text-2xl font-bold text-slate-900 mb-3'>
                No Bookings Found
              </h2>

              <p className='text-slate-500 mb-6 text-lg'>
                You haven't booked any hotels yet.
              </p>

              <Link to="/"
                className='inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold transition duration-200'
              >
                Explore Hotels
              </Link>

            </div>
          ) : (
            <div className='space-y-8'>

              {
                bookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking}/>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  )
}

export default BookingsPage
