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

      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5'>

        <div className='mb-3.5'>

          <h1 className='text-2xl sm:text-3xl font-bold text-[#001F6B] mb-3 text-center'>
            Update Hotel
          </h1>

        </div>

        <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-5'>

          <form onSubmit={handleSubmit} className='space-y-6 px-3'>

            <div>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Hotel Name
              </label>

              <input type="text" 
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter hotel name'
                className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
              />

            </div>

            <div>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Location
              </label>

              <input type="text" 
                name='location'
                value={formData.location}
                onChange={handleChange}
                placeholder='Enter location'
                className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
              />

            </div>

            <div>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Description
              </label>

              <textarea 
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows={2}
                placeholder='Update hotel description'
                className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
              />

            </div>

            <div>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Price Per Night
              </label>

              <input type="number" 
                name='pricePerNight'
                value={formData.pricePerNight}
                onChange={handleChange}
                placeholder='Enter price'
                className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
              />

            </div>

            <div>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Update Hotel Image
              </label>

              <div className='border-2 border-dashed border-slate-300 rounded-2xl p-3 bg-slate-50'>

                <input type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                  className='w-full text-slate-600'
                />

              </div>

            </div>

            <button type='submit' disabled={loading}
              className='w-full bg-[#1E73FF] hover:bg-[#1E73FF]/80 text-white py-3 rounded-2xl font-semibold text-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
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
