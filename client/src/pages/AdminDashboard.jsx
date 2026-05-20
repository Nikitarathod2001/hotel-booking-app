import React, {useEffect, useState} from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);


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
    <div>
      <h1>Admin Dashboard</h1>

      <p>Total Hotels: {" "}{stats.totalHotels}</p>
      <p>Total Bookings: {" "}{stats.totalBookings}</p>
      <p>Total Users: {" "}{stats.totalUsers}</p>
      <p>Revenue: {" "}&#8377;{stats.totalRevenue}</p>
    </div>
  )
}

export default AdminDashboard
