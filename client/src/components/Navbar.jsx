import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const {user, logout} = useAuth();


  return (
    <nav className='bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-lg bg-white/90'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

        <div className='flex items-center justify-between h-16'>
          
          <Link to="/"
            className='text-2xl font-bold text-slate-900 tracking-tight'
          >
            StayFinder
          </Link>

          {
            user ? (
              <div className='flex items-center gap-5'>

                <Link to="/wishlist"
                  className='group relative'
                >

                  <span className='text-3xl text-red-500'>
                    ♥
                  </span>

                </Link>

                <div className='relative group'>

                  <div className='w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-lg cursor-pointer select-none'>
                    {
                      user.name.charAt(0).toUpperCase()
                    }
                  </div>

                  <div className='absolute right-0 mt-3 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200'>

                    <div className='px-4 pb-3 border-b border-slate-100'>

                      <p className='text-sm text-slate-500'>
                        Signed in as
                      </p>

                      <p className='font-semibold text-slate-900 truncate'>
                        {user.name}
                      </p>

                    </div>

                    <Link to="/bookings"
                      className='block px-4 py-3 text-slate-700 hover:bg-slate-100 transition duration-200'
                    >
                      My Bookings
                    </Link>

                    <button onClick={logout}
                      className='w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition duration-200'
                    >
                      Logout
                    </button>

                  </div>

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
