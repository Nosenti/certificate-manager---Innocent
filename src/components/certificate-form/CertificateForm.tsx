import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FormPage.css';
import Button from '../button/Button';
import { useCertificates } from '../../context/CertificateContext';
import TextInput from '../text-input/TextInput';
import DateInput from '../date-input/DateInput';
import FormSelect from '../form-select/FormSelect';
import FileUpload from '../file-upload/FileUpload';
import PDFPreview from '../pdf-preview/PDFPreview';
import ResetModal from '../modal/Modal';
import SearchIcon from '../../../public/assets/search.svg';
import RemoveIcon from '../../../public/assets/close-small.svg';
import { validateForm } from '../../utils/validation';
import { useNotification } from '../../context/NotificationContext';

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
  | { type: 'RESET' }
  | { type: 'SET_INITIAL_STATE'; payload: FormData };

const formReducer = (state: FormData, action: FormAction): FormData => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    case 'SET_INITIAL_STATE':
      return action.payload;
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
  const { id } = useParams<{ id: string }>();
  const { addCertificate, certificates, updateCertificate } = useCertificates();
  const { notify } = useNotification();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [resetFile, setResetFile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [certificateToDelete, setCertificateToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const certificate = certificates.find((cert) => cert.id === parseInt(id));
      if (certificate) {
        dispatch({ type: 'SET_INITIAL_STATE', payload: certificate });
      }
    }
  }, [id, certificates]);

  const handleInputChange = 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      dispatch({ type: 'UPDATE_FIELD', field: name, value });
    }
  ;

  const handleFileChange =
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      dispatch({ type: 'UPDATE_FIELD', field: 'pdf', value: file });
    };

  const handleSubmit = 
    (e: React.FormEvent) => {
      e.preventDefault();
      const { isValid, errors } = validateForm(formData);

      if (isValid) {
        if (id) {
          updateCertificate(formData);
          notify('Certificate updated successfully', 'success');
        } else {
          addCertificate(formData);
          notify('Certificate created successfully', 'success');
        }

        navigate('/certificates');
        
      } else {
        setErrors(errors);
      }
    }

  const handleResetConfirm = () => {
    dispatch({ type: 'RESET' });
    setErrors({});
    setResetFile(true);
    setTimeout(() => setResetFile(false), 0);
    setShowModal(false);
  };

  const handleReset = () => {
    setShowModal(true);
  };

  const handleCloseModal =() => {
    setShowModal(false);
  };

  const handleFileRemove = () => {
    dispatch({ type: 'UPDATE_FIELD', field: 'pdf', value: null });
  };

  return (
    <section className="form-page">
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
          <div className='upload-actions'>
            <FileUpload onFileChange={handleFileChange} resetFile={resetFile} onFileRemove={handleFileRemove} file={formData.pdf} />
          
          </div>
          
          <PDFPreview file={formData.pdf} />
          <div className="form-action-buttons">
            <Button type="submit" variation="contained" size="medium">
              {id ? "Update" : "Save"}
            </Button>
            {
              !id ? <Button
              type="button"
              variation="transparent"
              size="medium"
              onClick={handleReset}
            >
              Reset
            </Button> : ''
            }
            
          </div>
        </div>
      </form>
      <ResetModal
        show={showModal}
        title="Confirm Reset"
        message="Are you sure you want to reset the form?"
        onConfirm={handleResetConfirm}
        onCancel={handleCloseModal}
      />
    </section>
  );
};

export default CertificateForm;
