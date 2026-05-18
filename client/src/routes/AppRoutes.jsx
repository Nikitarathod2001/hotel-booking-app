import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react'

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BookingsPage from "../pages/BookingsPage";
import HotelDetailsPage from "../pages/HotelDetailsPage";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/bookings" element={<BookingsPage/>}/>
        <Route path="/hotels/:id" element={<HotelDetailsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
