import React, {useEffect, useState} from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useAuth();


  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {

        setLoading(true);

        const response = await api.get("/admin/stats");

        setStats(response.data);
        
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);


  if(loading) {
    return (
      <p>Loading Dashboard...</p>
    );
  }

  return stats && (
    <div className='min-h-screen bg-slate-50'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

        <div className='mb-10'>

          <p className='text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3'>
            Admin Dashboard
          </p>

          <h1 className='text-4xl sm:text-5xl font-bold text-[#001F6B] leading-tight'>

            Welcome back,
            {" "}

            <span className='text-[#1E73FF]'>
              {user.name}
            </span>

          </h1>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>

          <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-6'>

            <p className='text-slate-500 text-sm mb-2'>
              Total Hotels
            </p>

            <h2 className='text-4xl font-bold text-slate-900'>
              {stats.totalHotels}
            </h2>

          </div>

          <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-6'>

            <p className='text-slate-500 text-sm mb-2'>
              Total Bookings
            </p>

            <h2 className='text-4xl font-bold text-slate-900'>
              {stats.totalBookings}
            </h2>

          </div>

          <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-6'>

            <p className='text-slate-500 text-sm mb-2'>
              Total Users
            </p>

            <h2 className='text-4xl font-bold text-slate-900'>
              {stats.totalUsers}
            </h2>

          </div>

          <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-6'>

            <p className='text-slate-500 text-sm mb-2'>
              Total Revenue
            </p>

            <h2 className='text-4xl font-bold text-slate-900'>
              &#8377;
              {stats.totalRevenue}
            </h2>

          </div>

        </div>

        <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5'>

          <div>

            <h2 className='text-2xl font-bold text-[#001F6B] mb-2'>
              Hotel Management
            </h2>

            <p className='text-slate-600'>
              Create, update, and manage hotel listings.
            </p>

          </div>

          <Link to="/admin/hotels"
            className='inline-flex items-center justify-center bg-[#001F6B] hover:bg-[#001F6B]/80 text-white px-6 py-3 rounded-2xl font-semibold transition duration-200'
          >
            Manage Hotels
          </Link>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard
