import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';
import Button from '../button/Button';
import { useCertificates } from '../context/CertificateContext';
import FormInput from '../form-input/FormInput';
import FormSelect from '../form-select/FormSelect';
import FileUpload from '../file-upload/FileUpload';
import PDFPreview from '../pdf-preview/PDFPreview';

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

const CertificateForm: React.FC = () => {
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
          <FormInput
            label="Supplier"
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
          />
          <FormSelect
            label="Certificate type"
            name="certificateType"
            value={formData.certificateType}
            onChange={handleInputChange}
            options={[
              { value: Options.PermissionOfPrinting, label: "Permission of Printing" },
              { value: Options.OHSAS18001, label: "OHSAS 18001" }
            ]}
          />
          <FormInput
            label="Valid from"
            type="date"
            name="validFrom"
            value={formData.validFrom}
            onChange={handleInputChange}
          />
          <FormInput
            label="Valid to"
            type="date"
            name="validTo"
            value={formData.validTo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-right">
          <FileUpload onFileChange={handleFileChange} />
          <PDFPreview file={formData.pdf} />
          <Button type='submit' variation='contained' size='medium'>Save</Button>
          <Button type="button" variation='transparent' size='medium' onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
