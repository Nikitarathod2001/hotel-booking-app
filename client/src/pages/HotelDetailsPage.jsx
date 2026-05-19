import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import toast from 'react-hot-toast';
import { createBooking } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';


const HotelDetailsPage = () => {

  const {id} = useParams();
  const {user} = useAuth();

  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    totalGuests: 1,
  });

  // Fetch Hotel
  useEffect(() => {
    const fetchHotel = async () => {
      try {

        setLoading(true);

        const data = await getHotelById(id);

        setHotel(data);
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch hotel");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);


  // Form Change
  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };


  // Create Booking
  const handleBooking = async (e) => {
    e.preventDefault();

    // Login required
    if(!user) {
      toast.error("Please login first");
      return navigate("/login");
    }

    try {

      setLoading(true);

      const payload = {
        hotelId: id,
        ...bookingData,
      };

      const data = await createBooking(payload);

      toast.success("Booking created successfully");

      console.log(data);

      navigate("/bookings");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return <p>Loading...</p>;
  }

  if(!hotel) {
    return <p>Hotel not found</p>;
  }

  return (
    <div>
      <img src={hotel.image} alt={hotel.name} width="400" />

      <h1>{hotel.name}</h1>
      <p>{hotel.location}</p>

      <p>&#8377;{hotel.pricePerNight} / night</p>
      <p>{hotel.description}</p>

      <hr />

      <h2>Book This Hotel</h2>

      <form onSubmit={handleBooking}>
        <div>
          <label>Check-In Date</label>

          <input type="date" 
            name='checkInDate'
            value={bookingData.checkInDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Check-Out Date</label>

          <input type="date" 
            name='checkOutDate'
            value={bookingData.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Total Guests</label>

          <input type="number" 
            name='totalGuests'
            value={bookingData.totalGuests}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type='submit' disabled={loading}>
          {
            loading ? "Creating Booking..." : "Book Now"
          }
        </button>
      </form>
    </div>
  )
}

export default HotelDetailsPage
