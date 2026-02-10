import { useState, useEffect } from "react";
import { Trash2, Eye, Zap, UploadCloud, X } from "lucide-react";
import api from "../api/axios.js";
import { fetchResumes } from "../api/api.js";
import { useNavigate } from "react-router"; // Note: 'react-router-dom' usually, not 'react-router'
import FileUploader from "../components/FileUploader.jsx";
import ResumeCard from "../components/ResumeCard.jsx";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false); // <--- Controls the popup
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes(setResumes, setLoading);
  }, []);

  // --- THE FIX: Handling File Uploads correctly ---
  const handleFileUpload = async (file) => {
    if (!file) return;

    // 1. Create FormData (This is the "Python" way of doing requests in JS)
    const formData = new FormData();
    formData.append("file", file); // Must match the backend parameter name 'file'

    try {
      setLoading(true);
      // 2. Send as Multipart form data
      const res = await api.post("/upload_resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 3. Update UI immediately
      setResumes([...resumes, res.data]);
      setShowUploadModal(false); // Close modal if open

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    try {
      await api.delete(`/resume/${id}`);
      setResumes(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewResume = async (resumeId) => {
  // 1. Open the new tab IMMEDIATELY (synchronously) to bypass popup blockers
  const pdfWindow = window.open("", "_blank");

  if (pdfWindow) {
    pdfWindow.document.write("<html><head><title>Loading Resume...</title></head><body>Loading PDF...</body></html>");
  }

  try {
    // 2. Fetch the data
    const response = await api.get(`/resume/${resumeId}/download`, {
      responseType: 'blob' // Crucial: tells Axios to treat this as binary data
    });

    // 3. Create the Blob URL
    // { type: 'application/pdf' } tells the browser "This is a PDF, render it!"
    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = window.URL.createObjectURL(file);

    // 4. Navigate the pre-opened tab to the PDF URL
    if (pdfWindow) {
      pdfWindow.location.href = fileURL;
    }

  } catch (error) {
    console.error("Could not fetch PDF", error);
    // If it fails, close the empty window so the user isn't confused
    pdfWindow?.close();
  }
};

  const handleQuickMatch = (resumeId) => {
    navigate('/match', { state: { selectedResumeId: resumeId } });
  };

  if (loading && resumes.length === 0) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 md:p-10 p-5 text-white relative">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Resumes</h1>  

        {/* Only show "Upload New" button if we already have resumes */}
        {resumes.length > 0 && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 hover:bg-green-500 md:px-4 md:py-2 px-2 py-1 rounded flex items-center md:gap-2 transition-colors"
          >
            <UploadCloud size={18} /> Upload New
          </button>
        )}
      </header>

      {/* --- EMPTY STATE --- */}
      {resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50">
          <UploadCloud size={48} className="mb-4 text-slate-500" />
          <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
          <p className="text-slate-400 mb-6">Upload your first resume to get started</p>
          <div className="w-64">
            {/* Directly pass the handler to your uploader */}
            <FileUploader onFileSelect={handleFileUpload} />
          </div>
        </div>
      ) : (
        /* --- GRID LAYOUT --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {resumes.map((resume) => (
            <ResumeCard 
              key={resume.id} 
              resume={resume}
              onQuickMatch={handleQuickMatch} // Your existing function
              onView={handleViewResume}  
              onDelete={handleDelete}        // Your existing function
            />
          ))}
        </div>
      )}

      {/* --- UPLOAD MODAL (When clicking 'Upload New') --- */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md relative border border-slate-700 shadow-2xl">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Upload New Resume</h2>
            <FileUploader onFileSelect={handleFileUpload} />
          </div>
        </div>
      )}
    </div>
  );
}