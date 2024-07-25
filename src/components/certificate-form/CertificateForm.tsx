import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';
import Button from '../button/Button';
import { useCertificates } from '../../context/CertificateContext';
import FormInput from '../form-input/FormInput';
import FormSelect from '../form-select/FormSelect';
import FileUpload from '../file-upload/FileUpload';
import PDFPreview from '../pdf-preview/PDFPreview';
import SearchIcon from '../../../public/assets/search.svg';
import RemoveIcon from '../../../public/assets/close-small.svg';

interface FormData {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
}

enum Options {
  PermissionOfPrinting = 'Permission of Printing',
  OHSAS18001 = 'OHSAS 18001',
}

const CertificateForm: React.FC = () => {
  const navigate = useNavigate();
  const { addCertificate } = useCertificates();
  const [formData, setFormData] = useState<FormData>({
    id: Date.now(),
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    pdf: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    if (validate()) {
      addCertificate(formData);
      navigate('/example1');
    }
  };

  const handleReset = () => {
    setFormData({
      id: Date.now(),
      supplier: '',
      certificateType: '',
      validFrom: '',
      validTo: '',
      pdf: null,
    });
    (document.getElementById('fileInput') as HTMLInputElement).value = '';
    setErrors({});
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.supplier) newErrors.supplier = 'Supplier is required';
    if (!formData.certificateType)
      newErrors.certificateType = 'Certificate type is required';
    if (!formData.validFrom)
      newErrors.validFrom = 'Valid from date is required';
    if (!formData.validTo) newErrors.validTo = 'Valid to date is required';
    if (formData.validFrom > formData.validTo)
      newErrors.validTo = 'End date should be after start date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <section className="form-page">
      <h1>New Certificate</h1>
      <form onSubmit={handleSubmit} className="certificate-form">
        <div className="form-left">
          <div className="supplier-form-input">
            <FormInput
              label="Supplier"
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
            />
            <span className="form-btn">
              <SearchIcon />
            </span>
            <span className="form-btn">
              <RemoveIcon />
            </span>
          </div>

          <FormSelect
            label="Certificate type"
            name="certificateType"
            value={formData.certificateType}
            error={errors.certificateType}
            onChange={handleInputChange}
            options={[
              {
                value: Options.PermissionOfPrinting,
                label: 'Permission of Printing',
              },
              { value: Options.OHSAS18001, label: 'OHSAS 18001' },
            ]}
          />
          <FormInput
            label="Valid from"
            type="date"
            name="validFrom"
            value={formData.validFrom}
            onChange={handleInputChange}
            error={errors.validFrom}
          />
          <FormInput
            label="Valid to"
            type="date"
            name="validTo"
            value={formData.validTo}
            onChange={handleInputChange}
            error={errors.validTo}
          />
        </div>
        <div className="form-right">
          <FileUpload onFileChange={handleFileChange} />
          <PDFPreview file={formData.pdf} />
          <div className="form-action-buttons">
            <Button type="submit" variation="contained" size="medium">
              Save
            </Button>
            <Button
              type="button"
              variation="transparent"
              size="medium"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CertificateForm;
