import React from 'react';
import { useEffect } from 'react';
import { getMyBookings } from '../services/bookingService';


const BookingsPage = () => {

  useEffect(() => {
    const fetchBookings = async () => {
      try {

        const data = await getMyBookings();
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <h1>My Bookings Page</h1>
  )
}

export default BookingsPage
