// import "./pdfjs-config";
import { getDocument } from "pdfjs-dist";
import { pdfWorker } from "./pdf-worker";

export async function extractTextFromPdf(file: File): Promise<string> {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const pdf = await getDocument({
          data: arrayBuffer,
          worker: pdfWorker,
        }).promise;
        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
        }

        resolve(extractedText);
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
        reject("Failed to extract text from PDF.");
      }
    };

    reader.onerror = () => {
      console.error("Error reading file:", reader.error);
      reject("Failed to read file.");
    };
  });
}
