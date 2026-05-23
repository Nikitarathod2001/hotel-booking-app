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
    <div className='min-h-screen bg-slate-50'>

      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

        <div className='mb-10'>

          <h1 className='text-4xl font-bold text-slate-900 mb-3'>
            Update Hotel
          </h1>

          <p className='text-slate-600 text-lg'>
            Edit hotel details and keep listings updated.
          </p>

        </div>

        <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8'>

          <form onSubmit={handleSubmit} className='space-y-6'>

            <div>

              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Hotel Name
              </label>

              <input type="text" 
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter hotel name'
                className='w-full rounded-2xl border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3'
              />

            </div>

            <div>

              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Location
              </label>

              <input type="text" 
                name='location'
                value={formData.location}
                onChange={handleChange}
                placeholder='Enter location'
                className='w-full rounded-2xl border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3'
              />

            </div>

            <div>

              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Description
              </label>

              <textarea 
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder='Update hotel description'
                className='w-full rounded-2xl border-slate-300 focus:border-slate-500 focus:ring-slate-500'
              />

            </div>

            <div>

              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Price Per Night
              </label>

              <input type="number" 
                name='pricePerNight'
                value={formData.pricePerNight}
                onChange={handleChange}
                placeholder='Enter price'
                className='w-full rounded-2xl border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3'
              />

            </div>

            <div>

              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Update Hotel Image
              </label>

              <div className='border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50'>

                <input type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                  className='w-full text-slate-600'
                />

              </div>

            </div>

            <button type='submit' disabled={loading}
              className='w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-semibold text-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {
                loading ? "Updating Hotel..." : "Update Hotel"
              }
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default UpdateHotelPage
