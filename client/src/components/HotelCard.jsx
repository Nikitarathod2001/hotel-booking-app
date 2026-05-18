import React from 'react';
import { Link } from 'react-router-dom';



const HotelCard = ({hotel}) => {
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
    </div>
  )
}

export default HotelCard;
