import React, {useEffect, useState} from 'react';
import { getAllHotels, deleteHotel } from '../services/hotelService';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';



const AdminHotelsPage = () => {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);


  // Fetch hotels
  const fetchHotels = async () => {
    try {

      setLoading(true);
      const data = await getAllHotels();
      setHotels(data.hotels);
      
    } catch (error) {
      toast.error("Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };


  // Delete Hotel
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete hotel?");

    if(!confirmDelete) {
      return;
    }

    try {

      await deleteHotel(id);
      toast.success("Hotel deleted");

      fetchHotels();
      
    } catch (error) {
      toast.error("Delete failed");
    }
  };


  useEffect(() => {
    fetchHotels();
  }, []);

  
  if(loading) {
    return (
      <p>Loading hotels...</p>
    );
  }

  return (
    <div>
      <h1>Manage Hotels</h1>

      <Link to="/admin/create-hotel">
        Add Hotel
      </Link>

      {
        hotels.length === 0 ? (
          <p>No hotels found</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel._id}>
              <img src={hotel.image} alt={hotel.name} width="200" />

              <h3>{hotel.name}</h3>

              <p>{hotel.location}</p>

              <p>&#8377;{hotel.pricePerNight}</p>

              <Link to={`/admin/update-hotel/${hotel._id}`}>
                Edit
              </Link>

              <button onClick={() => handleDelete(hotel._id)}>
                Delete
              </button>
              <hr />
            </div>
          ))
        )
      }
    </div>
  )
}

export default AdminHotelsPage
