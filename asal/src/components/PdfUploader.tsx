import { useState } from "react";
import { extractTextFromPdf } from "../utils/pdfExtractor";
import { detectPDFType } from "../utils/pdfUtils";
import PdfPreview from "./PdfPreview";
import ImageTextDetector from "./ImageTextDetector";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfType, setPdfType] = useState<"text" | "image" | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);
    setError(null);
    setText("");
    setPdfType(null);

    try {
      const type = await detectPDFType(uploadedFile);
      setPdfType(type);

      if (type === "text") {
        const extractedText = await extractTextFromPdf(uploadedFile);
        setText(extractedText);
      }
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
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="mb-4 w-full p-2 border rounded"
      />

      {loading && <div className="text-blue-500">Processing PDF...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {file && pdfType === "text" && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Extracted Text:</h3>
          <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">{text}</pre>
        </div>
      )}

      {file && pdfType === "image" && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4">PDF Preview and Text Detection</h3>
          <PdfPreview file={file} />
          <ImageTextDetector file={file} />
        </div>
      )}
    </div>
  );
}
