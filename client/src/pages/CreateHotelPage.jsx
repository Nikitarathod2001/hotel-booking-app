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
    <div className='min-h-screen bg-slate-50'>

      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-5'>

        <div className='mb-4'>

          <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-center'>
            Add New Hotel
          </h1>

        </div>

        <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8'>

          <form onSubmit={handleSubmit} className='sapce-y-6'>

            <div className='mb-3'>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Hotel Name
              </label>

              <input type="text" 
                name='name'
                placeholder='Enter hotel name'
                value={formData.name}
                onChange={handleChange}
                className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
              />

            </div>

            <div className='mb-3'>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Location
              </label>

              <input type="text" 
                name='location'
                placeholder='Enter hotel location'
                value={formData.location}
                onChange={handleChange}
                className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
              />

            </div>

            <div className='mb-3'>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Description
              </label>

              <textarea 
                name='description'
                placeholder='Write hotel description'
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
              />

            </div>

            <div className='mb-3'>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Price Per Night
              </label>

              <input type="number" 
                name='pricePerNight'
                placeholder='Enter price'
                value={formData.pricePerNight}
                onChange={handleChange}
                className='w-full rounded-2xl px-3 py-3 border border-zinc-400 focus:outline-1'
              />

            </div>

            <div className='mb-3'>

              <label className='block text-md font-medium text-slate-700 mb-2'>
                Hotel Image
              </label>

              <div className='border-2 border-dashed border-slate-300 rounded-2xl p-3 bg-slate-50 mb-5'>

                <input type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                  className='w-full text-slate-600'
                />

              </div>

            </div>

            <button type='submit' disabled={loading}
              className='w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl font-semibold text-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {
                loading ? "Adding Hotel..." : "Add Hotel"
              }
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default CreateHotelPage
