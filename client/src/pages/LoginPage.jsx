import React, { useState } from 'react';
import {loginUser} from "../services/authService";
import toast from "react-hot-toast";

const LoginPage = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      console.log(data);
      toast.success("Login Successful");

      setFormData({
        email: "",
        password: ""
      });
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
    </div>
  )
}

export default LoginPage
