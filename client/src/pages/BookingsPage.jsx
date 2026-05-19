import React, { useState } from 'react';
import { useEffect } from 'react';
import { getMyBookings } from '../services/bookingService';
import BookingCard from '../components/BookingCard';
import toast from 'react-hot-toast';


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
    <div>
      <h1>My Bookings Page</h1>

      {
        bookings.length === 0 ? (
          <p>No Bookings Found</p>
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking}/>
          ))
        )
      }
    </div>
  )
}

export default BookingsPage
