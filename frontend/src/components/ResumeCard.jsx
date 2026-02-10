import React from 'react';

// Added 'onDelete' to props
const ResumeCard = ({ resume, onQuickMatch, onView, onDelete }) => {
  // Parse date safely
  const formattedDate = new Date(resume.created_at).toLocaleDateString();
  
  const file_type = resume.name.split('.').pop().toUpperCase()
  let badge_color = "bg-red-500"; 

    if (file_type === "PDF") {
        badge_color = "bg-red-500";
    } else if (file_type === "DOCX") {
        badge_color = "bg-blue-500";
    } else {
        badge_color = "bg-gray-500";
    }

  return (
    <div className="group relative bg-gray-800 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg hover:shadow-green-900/20">
      
      {/* --- 1. THE THUMBNAIL AREA --- */}
      <div 
        className="h-40 bg-gray-700/50 relative flex justify-center items-center overflow-hidden cursor-pointer"
        onClick={() => onView(resume.id)}
      >
        
        {/* --- DELETE BUTTON (Top Left) --- */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents opening the resume when deleting
            onDelete(resume.id);
          }}
          className="absolute top-2 left-2 z-10 p-1.5 bg-red-600/90 text-white rounded-md shadow-md 
                     opacity-100 transition-all duration-200
                     hover:bg-red-700 hover:scale-110"
          title="Delete Resume"
        >
          {/* Trash Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

        {/* The "Paper" Mockup */}
        <div className="w-24 h-32 bg-white rounded shadow-md transform group-hover:scale-105 transition-transform duration-300 p-2 flex flex-col gap-1.5 opacity-90">
            {/* Header Lines */}
            <div className="w-1/3 h-1.5 bg-gray-400 rounded-full mb-1"></div>
            <div className="w-full h-[1px] bg-gray-300 mb-1"></div>
            
            {/* Body Text Mockup */}
            <div className="space-y-1">
                <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                <div className="w-5/6 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                <div className="w-4/5 h-1 bg-gray-200 rounded-full"></div>
            </div>

            {/* A second paragraph mockup */}
            <div className="space-y-1 mt-2">
                <div className="w-11/12 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                <div className="w-3/4 h-1 bg-gray-200 rounded-full"></div>
            </div>
        </div>

        {/* Overlay Badge (Top Right) */}
        <div className={`absolute top-2 right-2 ${badge_color} text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow`}>
          {file_type}
        </div>
      </div>

      {/* --- 2. THE INFO FOOTER --- */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-100 truncate mb-1" title={resume.name}>
          {resume.name}
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Uploaded on {formattedDate}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button 
            onClick={() => onQuickMatch(resume.id)}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm py-2 rounded-lg font-medium transition-colors"
          >
            Quick Match
          </button>
          
          <button 
            onClick={() => onView(resume.id)}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
            title="View Resume"
          >
            {/* Eye Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;