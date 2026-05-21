import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import toast from 'react-hot-toast';
import { createBooking } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import { getHotelReviews } from '../services/reviewService';
import ReviewForm from "../components/ReviewForm";


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

  const [reviews, setReviews] = useState([]);


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
    fetchReviews();
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


  // Fetch reviews
  const fetchReviews = async () => {
    try {

      const data = await getHotelReviews(id);
      setReviews(data);
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Fetch review failed");
    }
  };

  if(loading) {
    return <p>Loading...</p>;
  }

  if(!hotel) {
    return <p>Hotel not found</p>;
  }

  const today = new Date().toISOString().split("T")[0];

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
            min={today}
            required
          />
        </div>

        <div>
          <label>Check-Out Date</label>

          <input type="date" 
            name='checkOutDate'
            value={bookingData.checkOutDate}
            onChange={handleChange}
            min={bookingData.checkInDate || today}
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

      <ReviewForm hotelId={id}
        onReviewAdded={fetchReviews}
      />

      <h2>Reviews</h2>
      {
        reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id}>
              <h4>{review.user.name}</h4>
              <p>Rating: {" "}{review.rating}</p>
              <p>{review.comment}</p>
              <hr />
            </div>
          ))
        )
      }
    </div>
  )
}

export default HotelDetailsPage
