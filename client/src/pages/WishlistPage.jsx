import React, {useEffect, useState} from 'react';
import { getWishlist } from '../services/wishlistService';
import HotelCard from '../components/HotelCard';
import toast from 'react-hot-toast';

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
    <div>
      <h1>My Wishlist</h1>

      {
        hotels.length === 0 ? (
          <p>No Wishlist hotels</p>
        ) : (
          hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel}/>
          ))
        )
      }
    </div>
  )
}

export default WishlistPage
