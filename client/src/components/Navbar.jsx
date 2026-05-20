import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const {user, logout} = useAuth();


  return (
    <div>
      <h2>Hotel Booking App</h2>

      {
        user ? (
          <>
            <p>Welcome, {user.name}</p>

            <Link to="/wishlist">
              Wishlist
            </Link>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <p>Please Login</p>
        )
      }
    </div>
  )
}

export default Navbar
