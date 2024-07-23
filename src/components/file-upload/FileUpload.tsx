import React from 'react';
import Button from '../button/Button';

interface FileUploadProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  return (
    <label className='file-upload-label'>
      <input
        id="fileInput"
        type="file"
        accept="application/pdf"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <Button type='button' variation="primary" size="medium" onClick={() => document.getElementById('fileInput')?.click()}>
        Upload
      </Button>
    </label>
  );
};

export default FileUpload;
