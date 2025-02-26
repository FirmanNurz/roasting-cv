import { getDocument } from "pdfjs-dist";

export async function extractPDFAsImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: context!, viewport: viewport }).promise;
  return canvas.toDataURL("image/png");
}
