import { createWorker, Worker } from 'tesseract.js';

export async function detectTextFromImage(imageFile: File): Promise<string> {
  let worker: Worker | null = null;
  
  try {
    worker = await createWorker();
    
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    const { data: { text } } = await worker.recognize(imageFile);
    
    return text.trim();
  } catch (error) {
    console.error('Error detecting text:', error);
    throw error;
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
}