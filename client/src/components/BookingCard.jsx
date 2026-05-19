import React from 'react'

const BookingCard = ({booking}) => {
  return (
    <div style={{
      border: "1px solid gray",
      padding: "1rem",
      marginBottom: "1rem"
    }}>
      <img src={booking.hotel.image} alt={booking.hotel.name} />

      <h2>{booking.hotel.name}</h2>
      <p>{booking.hotel.location}</p>

      <p>
        Check-In:{" "}{new Date(booking.checkInDate).toLocaleDateString()}
      </p>

      <p>
        Check-Out:{" "}{new Date(booking.checkOutDate).toLocaleDateString()}
      </p>

      <p>
        Guests:{" "}{booking.totalGuests}
      </p>

      <p>
        Total Price:{" "}&#8377;{booking.totalPrice}
      </p>

      <p>
        Status:{" "}{booking.bookingStatus}
      </p>
    </div>
  )
}

export default BookingCard
