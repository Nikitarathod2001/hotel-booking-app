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
    <div 
      style={{
        border: "1px solid gray",
        padding: "1rem",
        marginBottom: "1rem"
      }}
    >
      <img src={hotel.image} alt={hotel.name} 
        width="250"
      />

      <h2>{hotel.name}</h2>
      <p>{hotel.location}</p>

      <p>&#8377;{hotel.pricePerNight} / night</p>
      <p>{hotel.description}</p>

      <Link to={`/hotels/${hotel._id}`}>
        View Details
      </Link>

      <button onClick={handleWishlist} disabled={wishlistLoading}>
        Wishlist
      </button>

      <p>
        Rating: {" "}{hotel.averageRating?.toFixed(1)}
      </p>
    </div>
  )
}

export default HotelCard;
