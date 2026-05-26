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
    <div className='min-h-screen bg-slate-50'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10'>

          <div>

            <Link to="/"
              className='px-6 py-3 rounded-2xl inline-flex items-center gap-2 text-[#001F6B] font-semibold text-md hover:text-white hover:bg-[#001F6B] transition duration-200 cursor-pointer'
            >

              <span>
                ←
              </span>
              Home

            </Link>

          </div>

          <Link to="/admin/add-hotel"
            className='inline-flex items-center justify-center bg-[#001F6B] hover:bg-[#001F6B]/80 text-white px-6 py-3 rounded-2xl font-semibold transition duration-200'
          >
            Add Hotel
          </Link>

        </div>

        {
          hotels.length === 0 ? (
            <div className='bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center'>

              <h2 className='text-2xl font-bold text-[#001F6B] mb-3'>
                No Hotels Found
              </h2>

              <p className='text-slate-600 mb-6'>
                Start by creating your first hotel listing.
              </p>

              <Link to="/admin/add-hotel"
                className='inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold transition duration-200'
              >
                Add Hotel
              </Link>

            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>

              {
                hotels.map((hotel) => (
                  <div key={hotel._id}
                    className='bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition duration-300'
                  >

                    <div className='overflow-hidden'>

                      <img src={hotel.image} alt={hotel.name} 
                        className='w-full h-60 object-cover hover:scale-105 transition duration-500'
                      />

                    </div>

                    <div className='p-6'>

                      <div className='mb-5'>

                        <h3 className='text-2xl font-bold text-[#001F6B] mb-2'>
                          {hotel.name}
                        </h3>

                        <p className='text-slate-500 mb-3'>
                          {hotel.location}
                        </p>

                        <p className='text-2xl font-bold text-[#001F6B]'>
                          &#8377;
                          {hotel.pricePerNight}

                          <span className='text-sm text-slate-500 font-normal ml-1'>
                            / night
                          </span>
                        </p>

                      </div>

                      <div className='flex items-center gap-3'>

                        <Link to={`/admin/update-hotel/${hotel._id}`}
                          className='flex-1 text-center bg-[#001F6B] hover:bg-[#001F6B]/80 text-white py-3 rounded-2xl font-semibold transition duration-200'
                        >
                          Edit
                        </Link>

                        <button onClick={() => handleDelete(hotel._id)}
                          className='flex-1 border border-red-300 text-red-600 hover:bg-red-50 py-3 rounded-2xl font-semibold transition duration-200'  
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  )
}

export default AdminHotelsPage
