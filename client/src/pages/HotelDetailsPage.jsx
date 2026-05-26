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
    <div className='min-h-screen bg-slate-50'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>

          <div className='lg:col-span-2'>

            <div className='overflow-hidden rounded-3xl shadow-sm border border-slate-900 mb-8'>

              <img src={hotel.image} alt={hotel.name} 
                className='w-full h-[450px] object-cover hover:scale-105 transition duration-500'
              />

            </div>

            <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8'>

              <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6'>

                <div>

                  <h1 className='text-4xl font-bold text-slate-900 mb-3'>
                    {hotel.name}
                  </h1>

                  <p className='text-slate-500 text-lg'>
                    {hotel.location}
                  </p>

                </div>

                <div className='bg-slate-100 px-4 py-2 rounded-2xl text-slate-800 font-semibold whitespace-nowrap'>
                  ⭐
                  {" "}
                  {
                    hotel.averageRating?.toFixed(1) || "0.0"
                  }
                </div>

              </div>

              <div className='mb-6'>

                <p className='text-4xl font-bold text-slate-900'>
                  &#8377;
                  {hotel.pricePerNight}

                  <span className='text-lg text-slate-500 font-normal ml-2'>
                    / night
                  </span>
                </p>

              </div>

              <div>

                <h2 className='text-2xl font-bold text-slate-900 mb-4'>
                  About This Hotel
                </h2>

                <p className='text-slate-600 leading-relaxed text-lg'>
                  {hotel.description}
                </p>

              </div>

            </div>

            <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8'>

              <div className='mb-8'>

                <h2 className='text-3xl font-bold text-slate-900 mb-3'>
                  Reviews
                </h2>

              </div>

              <div className='mb-10'>

                <ReviewForm hotelId={id} onReviewAdded={fetchReviews}/>

              </div>

              {
                reviews.length === 0 ? (
                  <div className='border border-dashed border-slate-300 rounded-2xl p-10 text-center'>

                    <p className='text-slate-500 text-lg'>
                      No reviews yet
                    </p>

                  </div>
                ) : (
                  <div className='space-y-6'>

                    {
                      reviews.map((review) => (
                        <div key={review._id}
                          className='border border-slate-200 rounded-2xl p-6'
                        >

                          <div className='flex items-center justify-between mb-4'>

                            <h4 className='text-lg font-bold text-slate-900'>
                              {review.user.name}
                            </h4>

                            <div className='bg-slate-100 px-3 py-1 rounded-xl text-sm font-semibold'>
                              ⭐
                              {" "}
                              {review.rating}
                            </div>

                          </div>

                          <p className='text-slate-600 leading-relaxed'>
                            {review.comment}
                          </p>

                        </div>
                      ))
                    }

                  </div>
                )
              }

            </div>

          </div>

          <div>

            <div className='sticky top-24 bg-white rounded-3xl shadow-sm border border-slate-200 p-8'>

              <h2 className='text-3xl font-bold text-slate-900 mb-6'>
                Book This Hotel
              </h2>

              <form onSubmit={handleBooking} className='space-y-6'>

                <div>

                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Check-In Date
                  </label>

                  <input type="date" 
                    name='checkInDate'
                    value={bookingData.checkInDate}
                    onChange={handleChange}
                    min={today}
                    required
                    className='w-full rounded-2xl border-slate-300 focus:border-slate-500 focus:ring-slate-500'
                  />

                </div>

                <div>

                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Check-Out Date
                  </label>

                  <input type="date" 
                    name='checkOutDate'
                    value={bookingData.checkOutDate}
                    onChange={handleChange}
                    min={bookingData.checkInDate || today}
                    required
                    className='w-full rounded-2xl border-slate-300 focus:border-slate-500 focus:ring-slate-500'
                  />

                </div>

                <div>

                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Total Guests
                  </label>

                  <input type="number" 
                    name='totalGuests'
                    value={bookingData.totalGuests}
                    onChange={handleChange}
                    min="1"
                    required
                    className='w-full rounded-2xl border-slate-300 focus:border-slate-500 focus:ring-slate-500'
                  />

                </div>

                <button type='submit' disabled={loading} 
                className='w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-semibold text-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {
                    loading ? "Creating Booking..." : "Book Now"
                  }
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default HotelDetailsPage
