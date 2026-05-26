import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";
import { getAllHotels } from "../services/hotelService";
import toast from "react-hot-toast";

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
    limit: 10,
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
    };

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
  const handleSearch = () => {
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#001F6B] mb-4">
            Find Your Perfect Stay
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl">
            Discover luxury hotels, budget stays, and unforgettable experiences
            around the world.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search hotel"
              value={formFilters.search}
              onChange={handleChange}
              className="w-full px-3 py-2 lg:px-3 rounded-4xl focus:outline-1"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formFilters.location}
              onChange={handleChange}
              className="w-full px-3 py-2 lg:px-3 rounded-4xl focus:outline-1"
            />

            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={formFilters.minPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 lg:px-3 rounded-4xl focus:outline-1"
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={formFilters.maxPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 lg:px-3 rounded-4xl focus:outline-1"
            />

            <button onClick={handleSearch}
              className="bg-[#1E73FF] hover:bg-[#1E73FF]/80 text-white rounded-xl px-5 py-3 font-medium transition duration-200 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900"/>
          </div>
        ) : (
          <>
            {/* Hotel List */}
            {hotels.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
                <p className="text-slate-600 text-lg">
                  No Hotels found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                  hotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                  ))
                }
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
              {
                Array.from(
                  { length: totalPages }, 
                  (_, index) => (
                    <button key={index} 
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-xl border transition duration-200 ${
                        appliedFilters.page === index + 1 
                        ? "bg-[#001F6B] text-white border-[#001F6B]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
