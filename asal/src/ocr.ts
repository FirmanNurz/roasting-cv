import { getDocument } from "pdfjs-dist";
import Tesseract from "tesseract.js";

document.getElementById("processBtn")?.addEventListener("click", async () => {
  const fileInput = (document.getElementById("pdfInput") as HTMLInputElement).files?.[0];
  if (!fileInput) return alert("Pilih file PDF terlebih dahulu!");

  const reader = new FileReader();
  reader.onload = async function () {
    try {
      const pdfData = new Uint8Array(this.result as ArrayBuffer);

      // Render PDF ke Canvas
      const pdf = await getDocument({ data: pdfData }).promise;
      const page = await pdf.getPage(1);
      const scale = 2;
      const viewport = page.getViewport({ scale });

      const canvas = document.getElementById("pdfCanvas") as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) throw new Error("Canvas or context not found");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      // Konversi Canvas ke ImageData
      const imageUrl = canvas.toDataURL("image/png");

      // OCR dengan Tesseract.js
      const { data } = await Tesseract.recognize(imageUrl, "eng", {
        logger: (m) => console.log(m),
      });

      document.getElementById("result")!.textContent = data.text;
    } catch (error) {
      console.error("Error processing PDF or OCR:", error);
      alert("Terjadi kesalahan saat memproses PDF atau OCR.");
    }
  };

  reader.readAsArrayBuffer(fileInput);
});
