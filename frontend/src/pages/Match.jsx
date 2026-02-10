import { useState, useEffect } from "react";
import { useLocation } from "react-router"; // 👈 Import this
import MatchResult from "../components/MatchResult";
import FileUploader from "../components/FileUploader.jsx";
import { uploadFiles, fetchResumes } from "../api/api.js";
import api from "../api/axios.js";

function Match() {
  const location = useLocation();
  
  // 1. Initialize with the ID passed from Dashboard (if it exists)
  const [selectedResumeId, setSelectedResumeId] = useState(location.state?.selectedResumeId || "");
  
  const [resumes, setResumes] = useState([]);
  const [jobDesc, setJobDesc] = useState(null);
  const [result, setResult] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Load resumes so the dropdown has options
  useEffect(() => {
    const loadResumes = async () => {
      try {
        const res = await api.get("/resumes");
        const data = res.data
        setResumes(data);
        console.log(data)
        // Edge case: If no ID was passed, select the first one automatically?
        if (!selectedResumeId && data.length > 0) {
            setSelectedResumeId(data[0].id);
        }
      } catch (err) {
        console.error("Error loading resumes:", err);

        if (err.response && err.response.data && err.response.data.detail) {
    // FastAPI validation errors come as an array or string
            const detail = err.response.data.detail;
            if (Array.isArray(detail)) {
              // It's a validation error list (e.g. "missing field")
              setError(`Validation Error: ${detail[0].msg} in ${detail[0].loc.join(" -> ")}`);
            } else {
              // It's a simple string error
              setError(`Error: ${detail}`);
            }
          } else {
            setError("An unexpected error occurred. Please check the console.");
          }
        }

    };


    console.log(selectedResumeId)
      console.log(selectedResumeId)

    loadResumes();
  }, []); // Run once on mount

  async function handleSubmit() {
    setIsLoading(true);
    setError(null);

    try {
        // 3. Send the Selected ID and the File
        const response = await uploadFiles(null, jobDesc, selectedResumeId);
        setResult(response);
    } catch (err) {
        setError(err.message || "Something went wrong matching the resume.");
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="p-2 mx-0 md:p-10 md:mx-10">
      <div className="max-w-3xl mx-auto mt-12 space-y-6">
        <h1 className="text-2xl font-bold text-gray-100">Resume–Job Match</h1>

        {/* --- RESUME SELECTION DROPDOWN --- */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Resume
            </label>
            <select
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
            >
                <option value="" disabled>-- Choose a Resume --</option>
                {resumes.map((resume) => (
                    <option key={resume.id} value={resume.id}>
                        {resume.name} 
                    </option>
                ))}
            </select>
        </div>

        {/* --- JOB DESCRIPTION UPLOAD --- */}
        <FileUploader
          label="Upload Job Description (PDF/TXT)"
          onFileSelect={setJobDesc}
        />

        {/* --- MATCH BUTTON --- */}
        <button
          disabled={!selectedResumeId || !jobDesc || isLoading}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500
                     text-gray-900 py-3 rounded-xl font-semibold transition hover:cursor-pointer flex justify-center items-center"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <span className="animate-pulse">Matching...</span>
          ) : (
            "Match Resume"
          )}
        </button>

        {/* --- ERROR MESSAGE --- */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* --- RESULTS --- */}
      {result && (
        <div className="mt-10">
            <MatchResult result={result} />
        </div>
      )}
    </div>
  );
}

export default Match;