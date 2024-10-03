import { FC, memo } from 'react';

interface PDFPreviewProps {
  file: string ;
}

const PDFPreview: FC<PDFPreviewProps> = memo(({ file }) => {
  console.log('PDF_: ', file);

  return (
    <div className="prev">
      {file && (
        <iframe
          src={file}
          width="100%"
          height="100%"
          title="PDF Preview"
        ></iframe>
      )}
    </div>
  );
});

export default PDFPreview;
