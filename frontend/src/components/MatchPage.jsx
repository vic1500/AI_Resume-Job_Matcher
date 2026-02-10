import { useState } from "react";
import FileUploader from "../components/FileUploader";
import { uploadFiles } from "../api/api";

export default function MatchPage({ setResult }) {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSumbit(resume_file, job_desc_file) {
    setIsLoading(true)
    setError(null)

    try {
        const result = await uploadFiles(resume_file, job_desc_file)
        setResult(result)
    } catch (err) {
        setError(err.message || "Something went wrong... Try again later");
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-6">
      <h1 className="text-2xl font-bold text-gray-100">
        Resume–Job Match
      </h1>

      <FileUploader
        label="Upload Resume"
        onFileSelect={setResume}
      />

      <FileUploader
        label="Upload Job Description"
        onFileSelect={setJobDesc}
      />

      <button
        disabled={!resume || !jobDesc || isLoading}
        className="w-full mt-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-700
                   text-gray-900 py-3 rounded-xl font-semibold transition hover:cursor-pointer"
        onClick={() => handleSumbit(resume, jobDesc)}
      >
        {isLoading ? <p className="text-gray-300 animate-pulse">
                Matching resume with job...
            </p> : 
            "Match Resume"}
      </button>

    {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            <strong>Error:</strong> {error}
        </div>
    )}
    </div>
  );
}
