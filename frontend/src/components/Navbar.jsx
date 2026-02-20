import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/" },
  { label: "Match", path: "/match" },
  { label: "Insights", path: "/insights" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const { user, logout } = useAuth(); // Get user state
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-green-400 hover:text-green-300 transition">
              AI Resume Matcher
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-green-400" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* CONDITIONAL RENDERING */}
            {user ? (
              // OPTION A: LOGGED IN (User Dropdown)
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-slate-200 hover:text-white focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold border border-green-500/50">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.username}</span>
                  <svg className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-1 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // OPTION B: LOGGED OUT (Get Started Button)
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-slate-900 px-4 py-2 rounded-lg font-bold transition shadow-lg shadow-green-500/20"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2"
          >
            {isOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-6 space-y-4 shadow-xl">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-base font-medium transition-colors ${
                  isActive ? "text-green-400" : "text-slate-300 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {user ? (
             <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center mb-3">
                   <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold border border-green-500/50 mr-3">
                      {user.username.charAt(0).toUpperCase()}
                   </div>
                   <span className="text-white font-medium">{user.username}</span>
                </div>
                <Link
                    to="/change-password"
                    onClick={() => setIsOpen(false)}
                    className="block text-slate-400 py-2 hover:text-white">Change Password
                </Link>
                <button
                    onClick={logout}
                    className="block text-red-400 py-2 hover:text-red-300 w-full text-left">
                  Log Out
                </button>
             </div>
          ) : (
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-green-500 hover:bg-green-600 text-slate-900 px-4 py-3 rounded-lg font-bold transition mt-4"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}