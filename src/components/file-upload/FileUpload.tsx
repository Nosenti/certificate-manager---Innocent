import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import Button from '../button/Button';
import './file-upload.css';

interface FileUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFile: boolean;
}

const FileUpload: FC<FileUploadProps> = memo(({ onFileChange, resetFile }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resetFile) {
      setFileName(null);
      setError(null);
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
    }
  }, [resetFile]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        setFileName(null);
      } else if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        setFileName(null);
      } else {
        setError(null);
        setFileName(file.name);
        onFileChange(e);
      }
    }
  };
  return (
    <div className="file-upload-container">
      <label className="file-upload-label" aria-label="Upload PDF file">
        <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          aria-invalid={!!error}
        />
        <Button
          type="button"
          variation="primary"
          size="medium"
          onClick={() => document.getElementById('fileInput')?.click()}
          aria-label="Upload"
        >
          Upload
        </Button>
      </label>
      {fileName && <p className="file-name">Selected file: {fileName}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
});

export default FileUpload;
