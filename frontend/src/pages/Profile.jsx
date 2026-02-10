import { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Profile() {
  const { user } = useAuth();

  // State for password form
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // 1. Basic Validation
    if (passwords.new_password !== passwords.confirm_password) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (passwords.new_password.length < 5) {
      setMessage({ type: "error", text: "New password must be at least 5 characters." });
      return;
    }

    setLoading(true);

    try {
      // 2. API Call
      await api.post("/change_password", {
        current_password: passwords.current_password,
        new_password: passwords.new_password
      });

      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswords({ current_password: "", new_password: "", confirm_password: "" }); // Reset form
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || "Failed to update password.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-3 md:px-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Account Settings</h1>

      <div className="grid gap-8 md:grid-cols-2">

        {/* --- LEFT: Profile Info (ReadOnly) --- */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-fit">
          <h2 className="text-xl font-semibold text-white mb-4">Profile Details</h2>
          <div className="space-y-4">
              <div>
              <label className="text-sm text-gray-400">Username</label>
              <div className="text-gray-200 font-medium">{user?.username}</div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Email Address</label>
              <div className="text-gray-200 font-medium">{user?.email}</div>
            </div>
            <div>
              <label className="text-sm text-gray-400">User ID</label>
              <div className="text-xs text-gray-500 font-mono">{user?.id}</div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: Change Password Form --- */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Change Password</h2>

          {message.text && (
            <div className={`p-3 mb-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-500/30' : 'bg-red-900/50 text-red-200 border border-red-500/30'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Current Password</label>
              <input
                type="password"
                name="current_password"
                value={passwords.current_password}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                name="new_password"
                value={passwords.new_password}
                onChange={handleChange}
                required
                minLength={5}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                value={passwords.confirm_password}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Profile;