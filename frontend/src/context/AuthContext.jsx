// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/authService"; // Import the new function

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // 1. Check User on App Load (Page Refresh)
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          // Verify token is valid by fetching user data
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          // If token is expired/invalid, clear it
          console.error("Session expired");
          localStorage.removeItem("access_token");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // 2. Login Function
  const login = async (token) => {
    localStorage.setItem("access_token", token);
    try {
      // Fetch user details immediately after setting token
      const userData = await getCurrentUser();
      setUser(userData);
      navigate("/dashboard"); // Redirect ONLY after we have the user data
    } catch (error) {
      console.error("Could not fetch user details");
      logout(); // Rollback if something breaks
    }
  };

  // 3. Logout Function
  const logout = () => {
    console.log("Removing access token")
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-green-500">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);