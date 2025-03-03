import { PDFWorker } from "pdfjs-dist";

const worker = new PDFWorker({
  name: "pdf-worker",
});

export { worker as pdfWorker };
