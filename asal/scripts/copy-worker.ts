import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

async function copyWorker() {
  try {
    await mkdir('public', { recursive: true });
    await copyFile(
      join('node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.js'),
      join('public', 'pdf.worker.min.js')
    );
    console.log('PDF worker file copied successfully');
  } catch (error) {
    console.error('Error copying PDF worker file:', error);
  }
}

copyWorker();