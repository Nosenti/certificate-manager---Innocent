import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './FormPage.css';

interface FormData {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
}

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    pdf: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, pdf: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data to the state or send it to the server here
    // For this example, let's assume we are saving to local storage
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    certificates.push(formData);
    localStorage.setItem('certificates', JSON.stringify(certificates));
    navigate('Hey');
  };

  const handleReset = () => {
    setFormData({
      supplier: '',
      certificateType: '',
      validFrom: '',
      validTo: '',
      pdf: null,
    });
  };

  return (
    <div className="form-page">
      <h1>New Certificate</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Supplier:
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Certificate type:
          <select
            name="certificateType"
            value={formData.certificateType}
            onChange={handleInputChange}
          >
            <option value="">Select type</option>
            <option value="Permission of Printing">Permission of Printing</option>
            <option value="OHSAS 18001">OHSAS 18001</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label>
          Valid from:
          <input
            type="date"
            name="validFrom"
            value={formData.validFrom}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Valid to:
          <input
            type="date"
            name="validTo"
            value={formData.validTo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Upload PDF:
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </label>
        {formData.pdf && (
          <div>
            <h3>PDF Preview:</h3>
            <iframe
              src={URL.createObjectURL(formData.pdf)}
              width="100%"
              height="500px"
              title="PDF Preview"
            ></iframe>
          </div>
        )}
        <button type="submit">Save</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default FormPage;
