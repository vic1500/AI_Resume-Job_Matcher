import React from 'react';
import { Link } from 'react-router';

const SignupCTA = () => {
  return (
    <div className="relative mt-12 overflow-hidden rounded-2xl border border-green-500/30 bg-gray-800/80 p-8 shadow-2xl">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-green-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-3">
            Don't lose this insight.
          </h3>
          <p className="text-gray-400 mb-6">
            Create a free account to unlock the full power of the Resume Matcher.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-left">

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="p-1.5 rounded-full bg-gray-700/50 text-green-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span>Save Match History</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="p-1.5 rounded-full bg-gray-700/50 text-blue-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <span>Store Multiple Resumes</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="p-1.5 rounded-full bg-gray-700/50 text-purple-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <span>Instant Quick-Match</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="p-1.5 rounded-full bg-gray-700/50 text-yellow-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span>No Repeated Uploads</span>
            </div>

          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
          <Link
            to="/signup"
            className="w-full text-center py-3 px-6 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-900/20 hover:scale-[1.02]"
          >
            Create Free Account
          </Link>
          <div className="flex items-center justify-between gap-2 text-md text-gray-400 px-1">
            <span>Already have one?</span>
            <Link to="/login" className="text-white hover:text-green-400 hover:underline">
              Log In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignupCTA;