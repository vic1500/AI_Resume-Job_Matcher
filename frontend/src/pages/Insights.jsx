import { useState, useEffect } from "react";
import api from "../api/axios";
import {useNavigate} from "react-router"; // Use your configured axios instance

function Insights() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/match/history"); // Ensure this matches your backend route prefix
        setHistory(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load match history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (e, matchId) => {
    e.stopPropagation(); // Stop row click from triggering if you have row clicks

    if (!window.confirm("Are you sure you want to delete this match record?")) return;

    try {
        await api.delete(`/match/history/${matchId}`);
        // Remove from UI immediately without refetching
        setHistory(prev => prev.filter(item => item.id !== matchId));
    } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete record.");
    }
  };

  if (loading) return <div className="p-10 text-gray-400">Loading history...</div>;
  if (error) return <div className="p-10 text-red-400">{error}</div>;

  return (
    <div className="py-2 md:p-10 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-center md:text-left text-gray-100 mb-8">Match Insights</h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No match history found. Go make some matches!</p>
      ) : (
        <div className="grid gap-6">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center hover:border-green-500/30 transition-colors"
            >
              {/* Left: Info */}
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xl font-bold ${getScoreColor(Math.round(item.final_score * 100))}`}>
                        {Math.round(item.final_score * 100)}%
                    </span>
                    <h2 className="text-lg font-semibold text-white">
                        {item.job_filename}
                    </h2>
                </div>
                <p className="text-sm text-gray-400">
                  Matched on: {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
                </p>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                  {/* View Details Button */}
                  <button
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
                    onClick={() => navigate(`/match/history/${item.id}`, { state: { match: item } })}
                  >
                    View Details
                  </button>

                  {/* 👇 NEW: Delete Button */}
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="p-2 bg-red-900/20 hover:bg-red-900/50 text-red-400 hover:text-red-200 border border-red-900/30 rounded-lg transition-colors"
                    title="Delete Record"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper to color-code the score
function getScoreColor(score) {
    if (score >= 70) return "text-green-400";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
}

export default Insights;