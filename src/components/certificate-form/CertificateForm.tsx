import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';
import Button from '../button/Button';
import { useCertificates } from '../context/CertificateContext';

interface FormData {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
}

enum Options {
  PermissionOfPrinting = "Permission of Printing",
  OHSAS18001 = "OHSAS 18001",
}

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const { addCertificate } = useCertificates();
  const [formData, setFormData] = useState<FormData>({
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    pdf: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, pdf: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCertificate(formData);
    navigate('/example1');
  };

  const handleReset = () => {
    setFormData({
      supplier: '',
      certificateType: '',
      validFrom: '',
      validTo: '',
      pdf: null,
    });
    (document.getElementById('fileInput') as HTMLInputElement).value = "";
  };

  return (
    <div className="form-page">
      <h1>New Certificate</h1>
      <form onSubmit={handleSubmit} className="certificate-form">
        <div className="form-left">
          <label className='form-input'>
            <span>Supplier:</span>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
            />
          </label>
          <label className='form-input'>
            <span>Certificate type:</span>
            <select
              name="certificateType"
              value={formData.certificateType}
              onChange={handleInputChange}
            >
              
              <option value="">Select type</option>
              <option value={ Options.PermissionOfPrinting}>
                Permission of Printing
              </option>
              <option value={ Options.OHSAS18001}>OHSAS 18001</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label className='form-input'>
            <span>Valid from:</span>
            <input
              type="date"
              name="validFrom"
              value={formData.validFrom}
              onChange={handleInputChange}
            />
          </label>
          <label className='form-input'>
            <span>Valid to:</span>
            <input
              type="date"
              name="validTo"
              value={formData.validTo}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-right">
          <label className='file-upload-label'>
            <input
              id="fileInput"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Button type='button' variation="primary" size="medium" onClick={() => document.getElementById('fileInput')?.click()}>
              Upload
            </Button>
          </label>
          <div className='prev'>
            {formData.pdf && (
              <iframe
                src={URL.createObjectURL(formData.pdf)}
                width="100%"
                height="100%"
                title="PDF Preview"
              ></iframe>
            )}
          </div>
          <Button type='submit' variation='secondary'>Save</Button>
          <Button type="button" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
