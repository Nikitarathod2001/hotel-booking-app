import React, {useState} from 'react';
import { createHotel } from '../services/hotelService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const CreateHotelPage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
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

      hotelData.append(
        "image", image
      );

      await createHotel(hotelData);

      toast.success("Hotel created");
      navigate("/admin/hotels");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Hotel</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" 
          name='name'
          placeholder='Hotel Name'
          value={formData.name}
          onChange={handleChange}
        />

        <input type="text" 
          name='location'
          placeholder='Location'
          value={formData.location}
          onChange={handleChange}
        />

        <input type="text" 
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
        />

        <input type="number" 
          name='pricePerNight'
          placeholder='Price'
          value={formData.pricePerNight}
          onChange={handleChange}
        />

        <input type="file" 
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type='submit' disabled={loading}>
          {
            loading ? "Creating..." : "Create Hotel"
          }
        </button>
      </form>
    </div>
  )
}

export default CreateHotelPage
