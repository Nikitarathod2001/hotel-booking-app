import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react'

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BookingsPage from "../pages/BookingsPage";
import HotelDetailsPage from "../pages/HotelDetailsPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import PaymentCancelPage from "../pages/PaymentCancelPage";
import AdminDashboard from "../pages/AdminDashboard";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/bookings" element={<BookingsPage/>}/>
        <Route path="/hotels/:id" element={<HotelDetailsPage/>}/>
        <Route path="/payment-success" element={<PaymentSuccessPage/>}/>
        <Route path="/payment-cancel" element={<PaymentCancelPage/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
