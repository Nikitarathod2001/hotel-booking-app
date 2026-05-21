import React, {lazy, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById, updateHotel } from '../services/hotelService';
import toast from 'react-hot-toast';



const UpdateHotelPage = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
  });


  // Fetch hotel
  useEffect(() => {
    const fetchHotel = async () => {
      try {

        const data = await getHotelById(id);

        setFormData({
          name: data.name,
          location: data.location,
          description: data.description,
          pricePerNight: data.pricePerNight,
        });
        
      } catch ( error) {
        toast.error("Failed to load hotel");
      }
    };

    fetchHotel();
  }, [id]);


  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      setLoading(true);

      const hotelData = new FormData();

      Object.keys(formData).forEach((key) => {
        hotelData.append(key, formData[key]);
      });

      if(image) {
        hotelData.append("image", image);
      }

      await updateHotel(id, hotelData);

      toast.success("Hotel updated");
      navigate("/admin/hotels");

    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Hotel</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" 
          name='name'
          value={formData.name}
          onChange={handleChange}
        />

        <input type="text" 
          name='location'
          value={formData.location}
          onChange={handleChange}
        />

        <input type="text" 
          name='description'
          value={formData.description}
          onChange={handleChange}
        />

        <input type="number" 
          name='pricePerNight'
          value={formData.pricePerNight}
          onChange={handleChange}
        />

        <input type="file" 
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type='submit' disabled={loading}>
          {
            loading ? "Updating..." : "Update Hotel"
          }
        </button>
      </form>
    </div>
  )
}

export default UpdateHotelPage
