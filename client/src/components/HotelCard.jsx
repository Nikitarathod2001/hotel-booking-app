import React from 'react'

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
    </div>
  )
}

export default HotelCard;
