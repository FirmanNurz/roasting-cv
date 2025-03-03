import { getDocument } from "pdfjs-dist";
// import './pdfjs-config';

export async function detectPDFType(file: File): Promise<"text" | "image"> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    // Check if the page has meaningful text content
    const text = textContent.items.map((item: any) => item.str).join(" ");
    return text.trim().length > 100 ? "text" : "image";
  } catch (error) {
    console.error("Error detecting PDF type:", error);
    return "image";
  }
}
