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
    <div>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" 
          name='name'
          placeholder='Enter name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input type="email" 
          name='email'
          placeholder='Enter email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input type="password" 
          name='password'
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type='submit' disabled={loading}>
          {
            loading ? "Loading..." : "Register"
          }
        </button>
      </form>

      <p>Already have an account?</p>
      <Link to="/login">
          Login Here
      </Link>
    </div>
  )
}

export default RegisterPage
