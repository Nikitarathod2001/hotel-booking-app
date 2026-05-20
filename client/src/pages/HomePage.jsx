import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import HotelCard from '../components/HotelCard';
import { getAllHotels } from '../services/hotelService';
import toast from 'react-hot-toast';


const HomePage = () => {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [formFilters, setFormFilters] = useState({
    search: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
  });

  // Applied filters for API
  const [appliedFilters, setAppliedFilters] = useState({
    page: 1,
    limit: 10
  });


  // Fetch hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {

        setLoading(true);

        const data = await getAllHotels(appliedFilters);

        setHotels(data.hotels);

        setTotalPages(data.totalPages);
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, [appliedFilters]);


  // Handle filter change
  const handleChange = (e) => {
    setFormFilters({
      ...formFilters,
      [e.target.name]: e.target.value,
    });
  };


  // Apply filters
  const hanldeSearch = () => {
    setAppliedFilters({
      ...formFilters,

      page: 1,
      limit: 10,
    });

    setFormFilters({
      search: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      page: 1,
    });
  };


  // Pagination
  const handlePageChange = (newPage) => {
    setAppliedFilters({
      ...appliedFilters,
      page: newPage,
    });
  };

  return (
    <div>
      <Navbar/>
      <h1>Hotels</h1>

      {/* Filters */}
      <div>
        <input type="text" 
          name='search'
          placeholder='Search hotel'
          value={formFilters.search}
          onChange={handleChange}
        />

        <input type="text" 
          name='location'
          placeholder='Location'
          value={formFilters.location}
          onChange={handleChange}
        />

        <input type="number" 
          name='minPrice'
          placeholder='Min Price'
          value={formFilters.minPrice}
          onChange={handleChange}
        />

        <input type="number" 
          name='maxPrice'
          placeholder='Max Price'
          value={formFilters.maxPrice}
          onChange={handleChange}
        />

        <button onClick={hanldeSearch}>
          Search
        </button>
      </div>

      {
        loading ? (
          <p>Loading hotels...</p>
        ) : (
          <>
            {/* Hotel List */}
            {
              hotels.length === 0 ? (
                <p>No Hotels found</p>
              ) : (
                hotels.map((hotel) => (
                  <HotelCard key={hotel._id} hotel={hotel}/>
                ))
              )
            }

            {/* Pagination */}
            <div>
              {
                Array.from(
                  {length: totalPages},
                  (_, index) => (
                    <button key={index}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default HomePage
