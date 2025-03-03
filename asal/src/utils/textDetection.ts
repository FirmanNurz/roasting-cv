// import { createWorker } from "tesseract.js";

// export async function detectTextFromImage(imageFile: File): Promise<string> {
//   const worker = await createWorker({
//     logger: (m: any) => console.log(m),
//     langPath: "https://tessdata.projectnaptha.com/4.0.0",
//     workerPath: "https://unpkg.com/tesseract.js@v4.0.0/dist/worker.min.js",
//     corePath: "https://unpkg.com/tesseract.js-core@v4.0.0/tesseract-core.wasm.js"
//   });

//   try {
//     await worker.loadLanguage("eng");
//     await worker.initialize("eng");

//     const imageUrl = URL.createObjectURL(imageFile);
//     const result = await worker.recognize(imageUrl);
//     URL.revokeObjectURL(imageUrl);
//     const cleanedText = result.data.text
//       .split("\n")
//       .map((line) => line.trim())
//       .filter((line) => line.length > 0)
//       .join("\n")
//       .replace(/\n{3,}/g, "\n\n")
//       .replace(/[^\S\n]+/g, " ")
//       .replace(/\s+:/g, ":")
//       .replace(/\s+,/g, ",")
//       .trim();

//     return cleanedText;
//   } catch (error) {
//     console.error("OCR Error:", error);
//     throw new Error("Failed to extract text from image");
//   } finally {
//     if (worker) {
//       await worker.terminate();
//     }
//   }
// }
