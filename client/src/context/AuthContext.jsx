import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist } from "../services/wishlistService";


const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [wishlist, setWishlist] = useState([]);

  // Load auth from localstorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if(storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setToken(jwtToken);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setWishlist([]);
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        
        const response = await getWishlist();

        setWishlist(response.map((hotel) => hotel._id));

      } catch (error) {
        console.log(error);
      }
    };

    if(token) {
      fetchWishlist();
    }
  }, [token]);


  const value = {
    user, token, login, logout,
    wishlist, setWishlist,
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>

};


export const useAuth = () => {
  return useContext(AuthContext);
}