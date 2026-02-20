import React from 'react';
import { Link } from 'react-router';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-green-500/30">

      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden py-24 sm:py-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-green-500/10 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-green-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            AI-Powered Career Tools
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-8">
            Beat the ATS. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Land the Interview.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Don't let an algorithm reject your resume. Our AI analyzes your fit against job descriptions instantly—so you know exactly what to fix before you apply.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Primary CTA: Get Started (Register) */}
            <Link
              to="/signup"
              className="px-8 py-4 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-lg transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/40 transform hover:-translate-y-1"
            >
              Get Started
            </Link>

            {/* Secondary CTA: Test Match (No Login) */}
            <Link
              to="/match"
              className="px-8 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium text-lg border border-gray-700 transition-all hover:border-gray-500"
            >
              Try a Test Match
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. Test match available without login.
          </p>
        </div>
      </div>

      {/* --- THE PROBLEM VS SOLUTION --- */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Why are you getting rejected?</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            You apply to dozens of jobs and never hear back. It's usually not your skills—it's keywords. Applicant Tracking Systems (ATS) filter you out before a human ever sees your name.
          </p>
          <ul className="space-y-4 mt-6">
            <li className="flex items-center gap-3 text-gray-300">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
              75% of resumes are rejected by ATS bots.
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
              Generic resumes fail to highlight relevance.
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
              Blind applying wastes hours of your time.
            </li>
          </ul>
        </div>

        {/* Abstract Visual Card */}
        <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl transform transition-transform group-hover:rotate-y-2 group-hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-8">
                    <div className="h-3 w-24 bg-gray-600 rounded-full"></div>
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="h-2 w-full bg-gray-700 rounded-full"></div>
                    <div className="h-2 w-5/6 bg-gray-700 rounded-full"></div>
                    <div className="h-2 w-full bg-gray-700 rounded-full"></div>
                    <div className="h-2 w-4/6 bg-gray-700 rounded-full"></div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-end">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Match Score</p>
                        <span className="text-4xl font-bold text-green-400">92%</span>
                    </div>
                    <div className="px-3 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                        Top 10% Candidate
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- HOW IT WORKS CARDS --- */}
      <div className="bg-gray-800/30 py-24 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-16">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl hover:border-gray-600 transition-colors group">
              <div className="w-14 h-14 bg-blue-900/20 text-blue-400 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-900/40 transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Upload Resume</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Drag and drop your PDF resume. We securely parse the text to understand your experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl hover:border-gray-600 transition-colors group">
              <div className="w-14 h-14 bg-purple-900/20 text-purple-400 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-900/40 transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Upload Job Description</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Copy text from LinkedIn or Indeed put in a docx or pdf file and upload. Our NLP engine identifies the critical skills required.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl hover:border-gray-600 transition-colors group">
              <div className="w-14 h-14 bg-green-900/20 text-green-400 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-900/40 transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Get Insights</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                See your match score, missing keywords, and actionable tips to optimize your application.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <div className="py-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Ready to land your dream job?</h2>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-200 hover:scale-105 transition-all"
        >
          Create Free Account
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
        <div className="mt-4">
            <Link to="/guest_match" className="text-gray-400 hover:text-white text-sm underline underline-offset-4">
                Or try a test match first
            </Link>
        </div>
      </div>

    </div>
  );
};

export default Landing;