import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

// 1. PROTECT THE DASHBOARD
// If user is NOT logged in, kick them to Login
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// 2. PROTECT THE LOGIN PAGE
// If user IS logged in, don't let them see Login/Signup
export const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};