import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toggleWishlist } from '../services/wishlistService';
import toast from 'react-hot-toast';



const HotelCard = ({hotel}) => {

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleWishlist = async () => {
    try {

      setWishlistLoading(true);

      const data = await toggleWishlist(hotel._id);

      toast.success(data.message);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Wishlist failed");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition duration-300 group'>
      <div className='overflow-hidden'>
        <img src={hotel.image} alt={hotel.name} 
          className='w-full h-64 object-cover group-hover:scale-105 transition duration-500'
        />
      </div>

      <div className='p-6'>
        <div className='flex items-start justify-between gap-4 mb-3'>
          <div>
            <h2 className='text-2xl font-bold text-slate-900'>
              {hotel.name}
            </h2>
            <p className='text-slate-500'>
              {hotel.location}
            </p>
          </div>

          <div className='bg-slate-100 text-slate-800 px-3 py-1 rounded-xl text-sm font-semibold whitespace-nowrap'>
            ⭐
            {" "}
            {
              hotel.averageRating?.toFixed(1) || "0.0"
            }
          </div>
        </div>

        <p className='text-slate-600 leading-relaxed mb-5 line-clamp-3'>
          {hotel.description}
        </p>

        <div className='flex items-center justify-between gap-4'>
          
          <div>

            <p className='text-2xl font-bold text-slate-900'>
              &#8377;
              {hotel.pricePerNight}
            </p>

            <span className='text-slate-500 text-sm'>
              per night
            </span>

          </div>

          <div className='flex items-center gap-5'>

            <button onClick={handleWishlist}
              disabled={wishlistLoading}
              className='text-3xl text-transparent  [-webkit-text-stroke:2px_red]
               hover:text-red-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {
                wishlistLoading ? "..." : "♥"
              }
            </button>

            <Link to={`/hotels/${hotel._id}`}
              className='bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl font-medium transition duration-200'
            >
              View Details
            </Link>

          </div>

        </div>
      </div>
    </div>
  )
}

export default HotelCard;
