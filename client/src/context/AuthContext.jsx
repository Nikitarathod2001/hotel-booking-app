import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
  };

  const value = {
    user, token, login, logout,
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>

};


export const useAuth = () => {
  return useContext(AuthContext);
}