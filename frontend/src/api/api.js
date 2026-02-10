// src/api/api.js
import api from './axios'; // Import the instance we configured

export async function uploadFiles(resumeFile, jobFile, resume_id = null) {
  try {
    const formData = new FormData();
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    // ✅ Only append if a file actually exists
    if (jobFile) {
      formData.append("job_description", jobFile);
    }

    // ✅ Only append if we have an ID
    if (resume_id) {
      formData.append("resume_id", resume_id);
    }

    // Axios automatically sets 'Content-Type: multipart/form-data' 
    // and attaches the Authorization token if it exists.
    const response = await api.post("/match", formData);

    return response.data;

  } catch (err) {
    // Axios wraps the backend response in err.response
    const errorMessage = err.response?.data?.detail || err.message || "Upload failed";
    throw new Error(errorMessage);
  }
}

export async function fetchResumes(setResumes, setLoading) {
  try {
    const res = await api.get("/resumes");
    setResumes(res.data);
  } catch (err) {
    console.error("Error fetching resumes:", err);
  } finally {
    setLoading(false);
  }
};