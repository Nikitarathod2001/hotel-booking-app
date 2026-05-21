import React, { useEffect, useState } from 'react';
import {loginUser} from "../services/authService";
import toast from "react-hot-toast";
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const {user, login} = useAuth();

  // Redirect if already logged in
  if(user) {
    navigate("/");
  }


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

      const data = await loginUser(formData);

      login(data.user, data.token);
      toast.success("Login Successful");

      setFormData({
        email: "",
        password: ""
      });

      navigate("/");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center px-auto'>

      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 px-10 py-4'>

        <div className='mb-8 text-center'>

          <h1 className='text-4xl font-bold text-slate-900 mb-3'>
            Welcome Back
          </h1>

          <p className='text-slate-500'>
            Login to continue booking amazing hotels
          </p>

        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>

          <div>

            <label className='block text-sm font-medium text-slate-700'>
              Email Address
            </label>

            <input type="email" 
              name='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              className='w-full rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3'
            />

          </div>

          <div>

            <label className='block text-sm font-medium text-slate-700'>
              Password
            </label>

            <input type="password" 
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              className='w-full rounded-xl border-slate-300 focus:border-slate-500 focus:ring-slate-500 py-3'
            />

          </div>

          <button type='submit' disabled={loading}
            className='w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {
              loading ? "Logging in..." : "Login"
            }
          </button>

        </form>

        <div className='mt-6 text-center'>
          
          <p className='text-slate-600'>
            Don't have an account?
          </p>

          <Link to="/register"
            className='inline-block mt-2 text-slate-900 font-semibold hover:underline'
          >
            Register Here
          </Link>

        </div>

      </div>

    </div>
  )
}

export default LoginPage
