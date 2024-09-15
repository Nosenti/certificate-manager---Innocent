import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FormPage.css';
import Button from '../button/Button';
import { Participant } from '../../../types/types';
import { useCertificates } from '../../context/CertificateContext';
import TextInput from '../text-input/TextInput';
import DateInput from '../date-input/DateInput';
import FormSelect from '../form-select/FormSelect';
import FileUpload from '../file-upload/FileUpload';
import PDFPreview from '../pdf-preview/PDFPreview';
import ResetModal from '../confirm-modal/ConfirmModal';
import SupplierLookup from '../supplier-lookup/SupplierLookup';
import ParticipantLookup from '../participant-lookup/ParticipantLookup';
import SearchIcon from '../../../public/assets/search.svg';
import RemoveIcon from '../../../public/assets/close-small.svg';
import { validateForm } from '../../utils/validation';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { addSupplier, getSuppliers } from '../../data/db';
import { Supplier } from '../../../types/types';
import Table, { Column } from '../table/Table';
import CommentSection from '../comment-section/CommentSection';

interface FormData {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
  assignedUsers: {
    id: number;
    name: string;
    department: string;
    email: string;
  }[];
}

const initialState: FormData = {
  id: Date.now(),
  supplier: '',
  certificateType: '',
  validFrom: '',
  validTo: '',
  pdf: null,
  assignedUsers: [],
};

type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string | File | null }
  | { type: 'RESET' }
  | { type: 'SET_INITIAL_STATE'; payload: FormData }
  | {
      type: 'ADD_ASSIGNED_USERS';
      users: { name: string; department: string; email: string }[];
    }
  | { type: 'REMOVE_ASSIGNED_USER'; index: number };

const formReducer = (state: FormData, action: FormAction): FormData => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    case 'SET_INITIAL_STATE':
      return action.payload;
    case 'ADD_ASSIGNED_USERS':
      const usersWithId = action.users.map((user, index) => ({
        ...user,
        id: Date.now() + index, // Assign a unique id
      }));
      return {
        ...state,
        assignedUsers: [...state.assignedUsers, ...usersWithId],
      };
    case 'REMOVE_ASSIGNED_USER':
      const assignedUsers = state.assignedUsers.filter(
        (_, i) => i !== action.index,
      );
      return { ...state, assignedUsers };
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
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [showSupplierLookup, setShowSupplierLookup] = useState(false);
  const [showParticipantLookup, setShowParticipantLookup] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (id) {
      const certificate = certificates.find((cert) => cert.id === parseInt(id));
      if (certificate) {
        dispatch({ type: 'SET_INITIAL_STATE', payload: certificate });
      }
    }
  }, [id, certificates]);

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
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'supplier',
      value: supplier.supplierName,
    });
    setShowSupplierLookup(false);
  };

  const handleParticipantSelect = (
    participants: { name: string; department: string; email: string }[],
  ) => {
    dispatch({ type: 'ADD_ASSIGNED_USERS', users: participants });
    setShowParticipantLookup(false);
  };

  const handleRemoveAssignedUser = (index: number) => {
    dispatch({ type: 'REMOVE_ASSIGNED_USER', index });
  };

  const assignedUsersColumns: Column<{
    id: number;
    name: string;
    department: string;
    email: string;
  }>[] = [
    {
      header: '',
      accessor: '' as keyof { name: string; department: string; email: string },
      render: (
        _value: string | number,
        row: { id: number; name: string; department: string; email: string },
        _index: number,
      ) => (
        <button type="button" onClick={() => handleRemoveAssignedUser(row.id)}>
          <RemoveIcon />
        </button>
      ),
    },
    { header: t.name, accessor: 'name' },
    { header: t.department, accessor: 'department' },
    { header: t.email, accessor: 'email' },
  ];

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
            <span
              className="form-btn"
              onClick={() => setShowSupplierLookup(true)}
            >
              <SearchIcon />
            </span>
            <span
              className="form-btn"
              onClick={() =>
                dispatch({ type: 'UPDATE_FIELD', field: 'supplier', value: '' })
              }
            >
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
          <div className="assigned-users">
            <label>Assigned Users</label>
            <div className="btn-wrapper">
              <Button
                type="button"
                variation="contained"
                size="medium"
                onClick={() => setShowParticipantLookup(true)}
              >
                {t.addParticipant}
              </Button>
            </div>
            <Table
              columns={assignedUsersColumns}
              data={formData.assignedUsers}
            />
          </div>
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
            {!id ? (
              <Button
                type="button"
                variation="transparent"
                size="medium"
                onClick={handleReset}
              >
                {t.reset}
              </Button>
            ) : null}
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
      <ParticipantLookup
        show={showParticipantLookup}
        onClose={() => setShowParticipantLookup(false)}
        onSelect={handleParticipantSelect}
      />
     
    </section>
  );
};

export default CertificateForm;