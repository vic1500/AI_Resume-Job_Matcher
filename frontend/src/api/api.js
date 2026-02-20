import api from './axios';

export async function uploadFiles(resumeFile, jobFile, resume_id = null) {
  try {
    const formData = new FormData();
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    if (jobFile) {
      formData.append("job_description", jobFile);
    }

    if (resume_id) {
      formData.append("resume_id", resume_id);
    }

    const response = await api.post("/match", formData);

    return response.data;

  } catch (err) {
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