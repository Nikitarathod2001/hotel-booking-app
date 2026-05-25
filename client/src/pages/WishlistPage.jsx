import React, {useEffect, useState} from 'react';
import { getWishlist } from '../services/wishlistService';
import HotelCard from '../components/HotelCard';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const WishlistPage = () => {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {

        setLoading(true);

        const data = await getWishlist();
        setHotels(data);
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if(loading) {
    return (
      <p>Loading wishlist...</p>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

        <div className='mb-10'>

          <h1 className='text-4xl font-bold text-slate-900 mb-3'>
            My Wishlist
          </h1>

          <p className='text-slate-600 text-lg'>
            Your saved hotels all in one place.
          </p>

        </div>

        {
          hotels.length === 0 ? (
            <div className='bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center'>

              <div className='text-6xl mb-5'>
                ❤️
              </div>

              <h2 className='text-2xl font-bold text-slate-900 mb-3'>
                Your Wishlist is Empty
              </h2>

              <p className='text-slate-500 text-lg mb-6'>
                Save your favorite hotels and access them anytime.
              </p>

              <Link to="/"
                className='inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold transition duration-200'
              >
                Explore Hotels
              </Link>

            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>

              {
                hotels.map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel}/>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  )
}

export default WishlistPage
