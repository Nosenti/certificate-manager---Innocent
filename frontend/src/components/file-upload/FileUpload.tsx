import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import Button from '../button/Button';
import './file-upload.css';
import { useLanguage } from '../../context/LanguageContext';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  resetFile: boolean;
  onFileRemove: () => void;
  file: string | null;
}

const FileUpload: FC<FileUploadProps> = memo(
  ({ onFileChange, resetFile, onFileRemove, file }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { t } = useLanguage();

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
          onFileChange(null); 
        } else if (file.size > 5 * 1024 * 1024) {
          setError('File size should be less than 5MB');
          setFileName(null);
          onFileChange(null); 
        } else {
          setError(null);
          setFileName(file.name);
          onFileChange(file); 
        }
      } else {
        setFileName(null);
        setError(null);
        onFileChange(null); 
      }
    };

    const handleRemoveFile = () => {
      setFileName(null);
      setError(null);
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
      onFileRemove();
      onFileChange(null);
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
            {t.upload}
          </Button>
          {file && (
            <Button
              type="button"
              size="medium"
              className="remove-button"
              onClick={handleRemoveFile}
              aria-label="Remove"
            >
              {t.remove}
            </Button>
          )}
        </label>
        {fileName && <p className="file-name">Selected file: {fileName}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  },
);

export default FileUpload;
