import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MatchResult from '../components/MatchResult';

const MatchDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the data passed via the router state
  const match = location.state?.match;

  // Redirect back if someone tries to access this page directly without data
  useEffect(() => {
    if (!match) {
      navigate('/insights');
    }
  }, [match, navigate]);

  if (!match) return null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* --- Back Button --- */}
      <button
        onClick={() => navigate('/insights')}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <div className="p-2 rounded-full bg-gray-800 group-hover:bg-gray-700 border border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
            </svg>
        </div>
        <span className="font-medium">Back to History</span>
      </button>

      {/* --- The Title --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Match Details</h1>
        <p className="text-gray-400">
           Reviewing analysis for <span className="text-green-400">{match.job_filename}</span>
        </p>
      </div>

      {/* --- Reuse your existing Match Result Component --- */}
      <MatchResult result={match} />
    </div>
  );
};

export default MatchDetails;