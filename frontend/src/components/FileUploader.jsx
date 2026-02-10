import { useRef, useState } from "react";

export default function FileUploader({
  label = "Upload file",
  accept = ".pdf,.docx",
  onFileSelect,
}) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  };

  return (
    <div className="w-full">
      <p className="mb-2 text-sm font-medium text-gray-300">{label}</p>

      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-gray-700 rounded-xl p-6 cursor-pointer
                   hover:border-green-400 transition bg-gray-900"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {!file ? (
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Drag & drop or <span className="text-green-400">click to upload</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF or DOCX only
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-200 font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 ).toFixed(2)} KB
              </p>
            </div>

            <span className="text-green-400 text-sm font-semibold">✓ Ready</span>
          </div>
        )}
      </div>
    </div>
  );
}
