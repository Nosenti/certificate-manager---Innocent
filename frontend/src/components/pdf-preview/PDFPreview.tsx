import { FC, memo, useEffect, useState } from 'react';

interface PDFPreviewProps {
  file: File | string | null;
}

const PDFPreview: FC<PDFPreviewProps> = memo(({ file }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (typeof file === 'string') {
      setFileUrl(file);
    } else {
      setFileUrl(null);
    }
  }, [file]);

  if (!fileUrl) {
    return <div>No file selected</div>;
  }

  return (
    <div className="prev">
      <iframe
        src={fileUrl}
        width="100%"
        height="100%"
        title="PDF Preview"
      ></iframe>
    </div>
  );
});

export default PDFPreview;
