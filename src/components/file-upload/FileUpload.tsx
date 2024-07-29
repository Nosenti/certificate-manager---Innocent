import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import Button from '../button/Button';
import './file-upload.css';
import en from '../../locales/en.json';
import de from '../../locales/de.json';
import { Locales } from '../../../types/types';
import { useLanguage } from '../../context/LanguageContext';

const locales: Locales = { en, de };

interface FileUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFile: boolean;
  onFileRemove: () => void;
  file: File | null;
}

const FileUpload: FC<FileUploadProps> = memo(({ onFileChange, resetFile, onFileRemove, file }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const t = locales[language as keyof Locales];

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

    const handleRemoveFile = () => {
      setFileName(null);
      setError(null);
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
      onFileRemove();
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
          {file && (
            <Button
              type="button"
              size="medium"
              className="remove-button"
              onClick={handleRemoveFile}
              aria-label="Remove"
            >
              Remove
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
