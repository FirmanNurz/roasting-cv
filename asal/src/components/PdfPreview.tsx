import { useState, useEffect } from 'react';
import { extractPDFAsImage } from '../utils/imageExtractor';

interface PdfPreviewProps {
  file: File;
}

export default function PdfPreview({ file }: PdfPreviewProps): JSX.Element {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      if (!file) return;
      
      try {
        if (!mounted) return; // Check mounted before expensive operation
        const extractedImages = await extractPDFAsImage(file);
        if (!mounted) return; // Check again after async operation
        setImages(extractedImages);
      } catch (err) {
        console.error('Error extracting images:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to extract images from PDF');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, [file]);

  if (loading) return <div>Loading preview...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {images.map((image, index) => (
        <div key={index} className="border rounded p-4">
          <img src={image} alt={`Page ${index + 1}`} className="max-w-full" />
        </div>
      ))}
    </div>
  );
}