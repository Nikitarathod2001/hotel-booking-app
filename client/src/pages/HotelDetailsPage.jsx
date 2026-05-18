import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import toast from 'react-hot-toast';


const HotelDetailsPage = () => {

  const {id} = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);

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
    </div>
  )
}

export default HotelDetailsPage
