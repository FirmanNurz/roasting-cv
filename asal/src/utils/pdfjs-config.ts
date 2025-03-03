import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

// GlobalWorkerOptions.workerSrc = "/node_modules/pdfjs-dist/build/pdf.worker.min.js";
// Set the worker globally
GlobalWorkerOptions.workerSrc = pdfjsWorker;
