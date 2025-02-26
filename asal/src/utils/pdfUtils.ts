import { getDocument } from "pdfjs-dist";
import { extractTextFromPdf } from "./pdfExtractor";

export async function detectPDFType(file: File): Promise<"text" | "image"> {
  try {
    const text = await extractTextFromPdf(file); //ini menentukan tipe pdf adalah hasil scan atau bukan.
    return text.trim().length > 100 ? "text" : "image";
  } catch (error) {
    console.error("Error detecting PDF type:", error);
    return "image";
  }
}
