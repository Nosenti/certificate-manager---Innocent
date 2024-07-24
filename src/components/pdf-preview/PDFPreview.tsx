import React from 'react';

interface PDFPreviewProps {
  file: File | null;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ file }) => {
  return (
    <div className="prev">
      {file && (
        <iframe
          src={URL.createObjectURL(file)}
          width="100%"
          height="100%"
          title="PDF Preview"
        ></iframe>
      )}
    </div>
  );
};

export default PDFPreview;
