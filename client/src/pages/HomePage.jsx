import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import HotelCard from '../components/HotelCard';
import { getAllHotels } from '../services/hotelService';
import toast from 'react-hot-toast';


const HomePage = () => {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {

        setLoading(true);

        const data = await getAllHotels();

        setHotels(data.hotels);
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>Available Hotels</h1>

      {
        loading ? (
          <p>Loading hotels...</p>
        ) : hotels.length === 0 ? (
          <p>No Hotels Found</p>
        ) : (
          hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel}/>
          ))
        )
      }
    </div>
  )
}

export default HomePage
