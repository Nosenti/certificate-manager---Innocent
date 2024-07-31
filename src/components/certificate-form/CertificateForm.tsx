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
import ResetModal from '../confirm-modal/ConfirmModal';
import SupplierLookup from '../supplier-lookup/SupplierLookup';
import SearchIcon from '../../../public/assets/search.svg';
import RemoveIcon from '../../../public/assets/close-small.svg';
import { validateForm } from '../../utils/validation';
import { useNotification } from '../../context/NotificationContext';
import en from '../../locales/en.json';
import de from '../../locales/de.json';
import { Locales } from '../../../types/types';
import { useLanguage } from '../../context/LanguageContext';

const locales: Locales = { en, de };

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
  const [certificateToDelete, setCertificateToDelete] = useState<number | null>(
    null,
  );
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [showSupplierLookup, setShowSupplierLookup] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    if (id) {
      const certificate = certificates.find((cert) => cert.id === parseInt(id));
      if (certificate) {
        dispatch({ type: 'SET_INITIAL_STATE', payload: certificate });
      }
    }
  }, [id, certificates]);

  const t = locales[language as keyof Locales];

  const handleInputChange = 
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      dispatch({ type: 'UPDATE_FIELD', field: name, value });
    };

  const handleFileChange =
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      dispatch({ type: 'UPDATE_FIELD', field: 'pdf', value: file });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(formData);

    if (!selectedSupplier && formData.supplier) {
        
        const newSupplier: Supplier = {
          id: Date.now(),
          supplierName: formData.supplier,
          supplierIndex: (getSuppliers.length + 1).toString(),
          city: 'Kigali',
        };
        await addSupplier(newSupplier);
        notify(`New supplier "${newSupplier.supplierName}" created`, 'success');
      }

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
    };

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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileRemove = () => {
    dispatch({ type: 'UPDATE_FIELD', field: 'pdf', value: null });
  };

  const handleSupplierSelect = (supplier: { supplierName: string }) => {
    dispatch({ type: 'UPDATE_FIELD', field: 'supplier', value: supplier.supplierName });
    setShowSupplierLookup(false);
  };

  return (
    <section className="form-page">
      <form onSubmit={handleSubmit} className="certificate-form">
        <div className="form-left">
          <div className="supplier-form-input">
            <TextInput
              label={t.supplier}
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
            />
            <span className="form-btn" onClick={() => setShowSupplierLookup(true)}>
              <SearchIcon />
            </span>
            <span className="form-btn" onClick={() => dispatch({ type: 'UPDATE_FIELD', field: 'supplier', value: '' })}>
              <RemoveIcon />
            </span>
          </div>

          <FormSelect
            label={t.certificateType}
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
            label={ t.validFrom}
            name="validFrom"
            value={formData.validFrom}
            onChange={handleInputChange}
            error={errors.validFrom}
          />
          <DateInput
            label={t.validTo}
            name="validTo"
            value={formData.validTo}
            onChange={handleInputChange}
            error={errors.validTo}
          />
        </div>
        <div className="form-right">
          <div className="upload-actions">
            <FileUpload
              onFileChange={handleFileChange}
              resetFile={resetFile}
              onFileRemove={handleFileRemove}
              file={formData.pdf}
            />
          </div>

          <PDFPreview file={formData.pdf} />
          <div className="form-action-buttons">
            <Button type="submit" variation="contained" size="medium">
              {id ? t.update : t.save}
            </Button>
            {
              !id ? <Button
              type="button"
              variation="transparent"
              size="medium"
              onClick={handleReset}
            >
              {t.reset}
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
      <SupplierLookup
        show={showSupplierLookup}
        onClose={() => setShowSupplierLookup(false)}
        onSelect={handleSupplierSelect}
      />
    </section>
  );
};

export default CertificateForm;