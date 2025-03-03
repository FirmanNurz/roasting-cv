import { useState, useEffect } from "react";
// import { detectTextFromImage } from "../utils/textDetection";

interface OCRProcessorProps {
  file?: File;
}

export default function OCRProcessor({ file }: OCRProcessorProps) {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const processImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // const extractedText = await detectTextFromImage(file);
        // setText(extractedText);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to process image");
        console.error("OCR Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    processImage();
  }, [file]);

  return (
    <div className="p-4 border rounded-lg">
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Processing image...</span>
        </div>
      )}

      {error && <div className="text-red-500 p-4 border border-red-200 rounded">{error}</div>}

      {text && !isLoading && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Extracted Text:</h3>
          <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded border">{text}</pre>
        </div>
      )}
    </div>
  );
}
