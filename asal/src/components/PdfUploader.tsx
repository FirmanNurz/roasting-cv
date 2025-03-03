import { useState } from "react";
import { extractTextFromPdf } from "../utils/pdfExtractor";
import { detectPDFType } from "../utils/pdfUtils";
import PdfPreview from "./PdfPreview";
import ImageTextDetector from "./ImageTextDetector";
import OCRProcessor from "./OCRProcessor";
// import "../utils/pdfjs-config";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "image" | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setFileType(uploadedFile.type.startsWith("image/") ? "image" : "pdf");
    setLoading(true);
    setError(null);
    setText("");

    try {
      const extractedText = await extractTextFromPdf(uploadedFile);
      setText(extractedText);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error processing PDF";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <input type="file" accept="application/pdf,image/*" onChange={handleFileUpload} className="mb-4 w-full p-2 border rounded" />

      {file && fileType === "image" && <OCRProcessor file={file} />}

      {file && fileType === "pdf" && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        </div>
      )}

      {loading && <div className="text-blue-500">Processing PDF...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {text && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <h3 className="text-lg font-bold">Extracted Text:</h3>
          <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">{text}</pre>
        </div>
      )}
    </div>
  );
}
