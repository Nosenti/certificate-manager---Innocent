import React, { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';
import Button from '../button/Button';
import { useCertificates } from '../../context/CertificateContext';
import TextInput from '../text-input/TextInput';
import DateInput from '../date-input/DateInput';
import FormSelect from '../form-select/FormSelect';
import FileUpload from '../file-upload/FileUpload';
import PDFPreview from '../pdf-preview/PDFPreview';
import SearchIcon from '../../../public/assets/search.svg';
import RemoveIcon from '../../../public/assets/close-small.svg';
import { validateForm } from '../../utils/validation';

interface FormData {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
}

const initialState: FormData = {
  id: Date.now(),
  supplier: '',
  certificateType: '',
  validFrom: '',
  validTo: '',
  pdf: null,
};

type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string | File | null }
  | { type: 'RESET' };

const formReducer = (state: FormData, action: FormAction): FormData => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

enum Options {
  PermissionOfPrinting = 'Permission of Printing',
  OHSAS18001 = 'OHSAS 18001',
}

const CertificateForm: React.FC = () => {
  const navigate = useNavigate();
  const { addCertificate } = useCertificates();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [resetFile, setResetFile] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    dispatch({ type: 'UPDATE_FIELD', field: 'pdf', value: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(formData);

    if (isValid) {
      addCertificate(formData);
      navigate('/example1');
    } else {
      setErrors(errors);
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setErrors({});
    setResetFile(true);
    setTimeout(() => setResetFile(false), 0);
  };

  return (
    <section className="form-page">
      <h1>New Certificate</h1>
      <form onSubmit={handleSubmit} className="certificate-form">
        <div className="form-left">
          <div className="supplier-form-input">
            <TextInput
              label="Supplier"
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
          <DateInput
            label="Valid from"
            name="validFrom"
            value={formData.validFrom}
            onChange={handleInputChange}
            error={errors.validFrom}
          />
          <DateInput
            label="Valid to"
            name="validTo"
            value={formData.validTo}
            onChange={handleInputChange}
            error={errors.validTo}
          />
        </div>
        <div className="form-right">
          <FileUpload onFileChange={handleFileChange} resetFile={resetFile} />
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
