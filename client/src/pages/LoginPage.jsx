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
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" 
          placeholder='Enter email'
          value={formData.email}
          onChange={handleChange}
        />
        <input type="password" name="password" 
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
        />

        <button type='submit' disabled={loading}>
          {
            loading ? "Loading..." : "Login"
          }
        </button>
      </form>

      <p>
        Don't have an account?
      </p>
      <Link to="/register">
        Register Here
      </Link>
    </div>
  )
}

export default LoginPage
