import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans selection:bg-green-500/30 pb-20">

      {/* --- HEADER: Clean & Simple (No Big Hero) --- */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-b border-gray-800">
        <h1 className="text-4xl font-bold text-white mb-4">About the Project</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          An open-source experiment to demystify Applicant Tracking Systems (ATS)
          using Natural Language Processing (NLP).
        </p>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-4xl mx-auto px-6 py-12 grid gap-16">

        {/* 1. THE MISSION (Editorial Layout) */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
            The Mission
          </h2>
          <div className="prose prose-invert max-w-none text-gray-400">
            <p className="mb-4">
              Modern hiring is broken. Qualified candidates are often rejected simply because their
              resume lacks specific keywords that automated systems are programmed to find.
            </p>
            <p>
              This project aims to bridge that gap. By using <strong>Vector Embeddings</strong>, <strong>Skill Extraction and Matching Techniques</strong> and
               <strong> Cosine Similarity</strong>, we simulate how an ATS parses your resume against a
              job description. The goal isn't to "cheat" the system, but to provide transparency
              so you can present your true skills effectively.
            </p>
          </div>
        </section>

        {/* 2. UNDER THE HOOD (Tech Stack) */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            Under the Hood
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backend Card */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
                Backend (Python)
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>FastAPI</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Framework</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>SQLModel / SQLAlchemy</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Database</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Spacy & Sentence-Transformer</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">NLP Logic</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>pdfPlumber</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">PDF Parsing</span>
                </li>
              </ul>
            </div>

            {/* Frontend Card */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
                Frontend (React)
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>React + Vite</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Core</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Tailwind CSS</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Styling</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Axios</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">API Client</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>React Router</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Navigation</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. FUTURE ROADMAP (Timeline Style) */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
            Roadmap
          </h2>
          <div className="border-l-2 border-gray-800 ml-3 space-y-8 pl-8 relative">

            {/* Item 1 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-green-500 border-4 border-gray-900"></span>
              <h3 className="text-lg font-bold text-white">MVP Launch</h3>
              <p className="text-sm text-gray-500 mb-1">Current Version</p>
              <p className="text-gray-400">Basic resume parsing, keyword matching, and similarity scoring.</p>
            </div>

            {/* Item 2 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-gray-700 border-4 border-gray-900"></span>
              <h3 className="text-lg font-bold text-white">Generative AI Feedback</h3>
              <p className="text-sm text-gray-500 mb-1">Coming Soon</p>
              <p className="text-gray-400">Integrating LLMs (OpenAI/Gemini) to rewrite resume bullet points automatically.</p>
            </div>

            {/* Item 3 */}
            <div className="relative">
              <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-gray-700 border-4 border-gray-900"></span>
              <h3 className="text-lg font-bold text-white">Job Board Integration</h3>
              <p className="text-sm text-gray-500 mb-1">Future</p>
              <p className="text-gray-400">Browser extension to scrape job descriptions directly from LinkedIn.</p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default About;