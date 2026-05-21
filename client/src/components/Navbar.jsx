import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const {user, logout} = useAuth();


  return (
    <nav className='bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-lg bg-white/90'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to="/"
            className='text-2xl font-bold text-slate-900 tracking-tight'
          >
            StayFinder
          </Link>

          {
            user ? (
              <div className='flex items-center gap-6'>
                <p className='hidden sm:block text-slate-600 font-medium'>
                  Welcome, 
                  {" "}
                  <span className='text-slate-900'>
                    {user.name}
                  </span>
                </p>

                <div className='flex items-center gap-4'>
                  <Link to="/wishlist"
                    className='text-slate-700 hover:text-slate-900 font-medium transition duration-200'
                  >
                    Wishlist
                  </Link>
                  <Link to="/bookings"
                    className='text-slate-700 hover:text-slate-900 font-medium transition duration-200'
                  >
                    My Bookings
                  </Link>

                  <button onClick={logout}
                    className='bg-slate-900 hover:bg-slate-900 text-white px-4 py-2 rounded-xl font-medium transition duration-200'
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-4'>
                <Link to="/login"
                  className='text-slate-700 hover:text-slate-900 font-medium transition duration-200'
                >
                  Login
                </Link>

                <Link to="/register"
                  className='bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-medium transition duration-200'
                >
                  Register
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
