import { useState, useEffect, ChangeEvent } from "react";
import { detectTextFromImage } from "../utils/textDetection";

interface ImageTextDetectorProps {
  file?: File;
}

export default function ImageTextDetector({ file }: ImageTextDetectorProps): Element {
  const [detectedText, setDetectedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const processFile = async (fileToProcess: File) => {
    setIsLoading(true);
    try {
      const text = await detectTextFromImage(fileToProcess);
      setDetectedText(text);
    } catch (error) {
      console.error("Failed to detect text:", error);
      alert("Failed to detect text from image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;
    processFile(uploadedFile);
  };

  useEffect(() => {
    if (file) {
      processFile(file);
    }
  }, [file]); // processFile is now defined outside useEffect

  return (
    <>
      <div className="p-4">
        {!file && <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />}

        {isLoading && <p>Detecting text...</p>}

        {detectedText && (
          <div className="mt-4">
            <h3 className="font-bold">Detected Text:</h3>
            <p className="whitespace-pre-wrap">{detectedText}</p>
          </div>
        )}
      </div>
    </>
  );
}
