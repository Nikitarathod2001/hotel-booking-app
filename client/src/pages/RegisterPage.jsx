import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';


const RegisterPage = () => {

  const navigate = useNavigate();

  const {user, login} = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // Redirect logged-in users
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

      const data = await registerUser(formData);

      login(data.user, data.token);

      toast.success("Registration successful");

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      navigate("/");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
    <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4'>

      <div className='w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8'>

        <div className='mb-8 text-center'>

          <h1 className='text-4xl font-bold text-[#001F6B] mb-3'>
            Create Account
          </h1>

        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>

          <div>

            <label className='block text-md font-medium text-slate-700 mb-2'>
              Full Name
            </label>

            <input type="text" 
              name='name'
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full rounded-xl border px-3 py-3 border-zinc-400 focus:outline-1'
            />

          </div>

          <div>

            <label className='block text-md font-medium text-slate-700 mb-2'>
              Email Address
            </label>

            <input type="text" 
              name='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full rounded-xl border px-3 py-3 border-zinc-400 focus:outline-1'
            />

          </div>

          <div>

            <label className='block text-md font-medium text-slate-700 mb-2'>
              Password
            </label>

            <input type="text" 
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full rounded-xl border px-3 py-3 border-zinc-400 focus:outline-1'
            />

          </div>

          <button type='submit' disabled={loading}
            className='w-full bg-[#1E73FF] hover:bg-[#1E73FF]/80 text-white py-3 rounded-xl font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {
              loading ? "Creating account..." : "Register"
            }
          </button>

        </form>

        <div className='mt-6 text-center'>

          <p className='text-slate-600'>
            Already have an account?
          </p>

          <Link to="/login"
            className='inline-block mt-2 text-[#001F6B] font-semibold hover:underline'
          >
            Login Here
          </Link>

        </div>

      </div>

    </div>
  )
}

export default RegisterPage
