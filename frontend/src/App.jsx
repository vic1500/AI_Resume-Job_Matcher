import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute, PublicOnlyRoute } from "./components/RouteGuards"; // Assuming you extracted them
import Dashboard from "./pages/Dashboard";
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './pages/LandingPage.jsx';
import Match from './pages/Match';
import Navbar from "./components/Navbar.jsx";
import Insights from "./pages/Insights.jsx";
import MatchDetails from "./pages/MatchDetails.jsx";
import About from "./pages/About.jsx";
import GuestMatch from "./pages/GuestMatch.jsx";
import Profile from "./pages/Profile.jsx"; // Your current "Match" page

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="bg-slate-900 h-screen text-white">Loading App...</div>;

  return (
      <div>
          <Navbar />
        <Routes>

          {/* --- THE TRAFFIC CONTROLLER (Root Path) --- */}
          {/* Logic: If User exists -> Dashboard. Else -> Landing Page */}
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />}
          />

          {/* --- AUTHENTICATED ROUTES --- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
            <Route
            path="/match"
            element={
              <ProtectedRoute>
                <Match />
              </ProtectedRoute>
            }
          />

            <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <Insights />
              </ProtectedRoute>
            }
          />

            <Route
                path="/match/history/:id"
                element={
                <ProtectedRoute>
                    <MatchDetails />
                </ProtectedRoute>
            }
            />
            <Route
                path="/user/profile"
                element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
            />

          {/* --- PUBLIC ONLY ROUTES --- */}
          {/* prevent logged-in users from accessing login page */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <Signup />
              </PublicOnlyRoute>
            }
          />
            {/*---- General Routes ------*/}
            <Route
            path="/about"
            element={
                <About />
            }
          />
             <Route
            path="/guest_match"
            element={
                <GuestMatch />
            }
          />

          {/* --- CATCH ALL --- */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
  );
}

export default App;