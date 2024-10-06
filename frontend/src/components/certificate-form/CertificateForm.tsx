import React, { useState, useReducer, useEffect, lazy } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FormPage.css';
import Button from '../button/Button';
import { useCertificates } from '../../context/CertificateContext';
import { useUser } from '../../context/UserContext';
import TextInput from '../text-input/TextInput';
import DateInput from '../date-input/DateInput';
import FormSelect from '../form-select/FormSelect';
import FileUpload from '../file-upload/FileUpload';
import PDFPreview from '../pdf-preview/PDFPreview';
import ResetModal from '../confirm-modal/ConfirmModal';
const SupplierLookup = lazy(() => import('../supplier-lookup/SupplierLookup'));
const ParticipantLookup = lazy(() => import('../participant-lookup/ParticipantLookup'));
import SearchIcon from '../../../public/assets/search.svg';
import RemoveIcon from '../../../public/assets/close-small.svg';
import { validateForm } from '../../utils/validation';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { AssignedUser, Supplier } from '../../types/types';
import Table, { Column } from '../table/Table';
import CommentSection from '../comment-section/CommentSection';
import { UUID } from 'crypto';
import { useApi } from '../../context/ApiContext';
import { ApiClient } from '../../services/ApiClient';

interface FormData {
  handle?: string;
  supplier: Supplier | null;
  type?: string;
  validFrom: string;
  validTo: string;
  pdfDocument: File | string | null;
  participants: AssignedUser[];
  comments: { userHandle: UUID; certificateHandle: UUID; text: string }[];
}

const initialState: FormData = {
  supplier: null,
  type: '',
  validFrom: '',
  validTo: '',
  pdfDocument: null,
  participants: [],
  comments: [],
};

type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: any }
  | { type: 'RESET' }
  | { type: 'SET_INITIAL_STATE'; payload: FormData }
  | {
      type: 'ADD_ASSIGNED_USERS';
      users: AssignedUser[];
    }
  | { type: 'REMOVE_ASSIGNED_USER'; index: number }
  | {
      type: 'ADD_COMMENT';
      comment: { userHandle: UUID; certificateHandle: UUID; text: string };
    };

const formReducer = (state: FormData, action: FormAction): FormData => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    case 'SET_INITIAL_STATE':
      return action.payload;
    case 'ADD_ASSIGNED_USERS':
      return {
        ...state,
        participants: [...state.participants, ...action.users],
      };
    case 'REMOVE_ASSIGNED_USER':
      const participants = state.participants.filter(
        (_, i) => i !== action.index,
      );
      return { ...state, participants };
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
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
  const { handle } = useParams<{ handle: UUID }>();
  const { addCertificate, certificates, updateCertificate } = useCertificates();
  const { notify } = useNotification();
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [resetFile, setResetFile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSupplierLookup, setShowSupplierLookup] = useState(false);
  const [showParticipantLookup, setShowParticipantLookup] = useState(false);
  const { t } = useLanguage();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { client } = useApi();
  const { currentUser } = useUser();

  useEffect(() => {
    if (handle) {
      setLoading(true);
      setFetchError(null);
      const fetchCertificate = async () => {
        try {
          const certificate = await client.certificatesGET(handle);
          console.log("certificate retrived: ", certificate);
          if (certificate) {
            const pdfBase64 = certificate.pdfDocument
              ? `data:application/pdf;base64,${certificate.pdfDocument}`
              : null;
            dispatch({
              type: 'SET_INITIAL_STATE',
              payload: {
                ...certificate,
                validFrom: certificate.validFrom
                  ? new Date(certificate.validFrom).toISOString().split('T')[0]
                  : '',
                validTo: certificate.validTo
                  ? new Date(certificate.validTo).toISOString().split('T')[0]
                  : '',
                pdfDocument: pdfBase64,
                participants: certificate.participants || [],
                comments: certificate.comments || [],
              },
            });
          } else {
            setFetchError('Certificate not found');
          }
        } catch (error) {
          console.error('Error fetching certificate:', error);
          setFetchError('Error fetching certificate');
        } finally {
          setLoading(false);
        }
      };

      fetchCertificate();
    }
  }, [handle, certificates]);

  if (loading) {
  return <div>Loading...</div>;
}

  const handleAddComment = async (comment: {
    userHandle: UUID;
    text: string;
  }) => {
    if (!handle) {
      console.error('Certificate handle is missing');
      return
    }
    try {
      const commentDto: ApiClient.CommentDto = {
        userHandle: comment.userHandle,
        text: comment.text,
      };
      const newComment = await client.comments(handle, commentDto);
      newComment.userName = currentUser?.name;
      newComment.text = comment.text; 
      dispatch({ type: 'ADD_COMMENT', comment: newComment });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    
  };

  const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  };

  const handleFileChange = (file: File | null) => {
    dispatch({ type: 'UPDATE_FIELD', field: 'pdfDocument', value: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { isValid, errors } = validateForm(formData);

  if (isValid) {
    try {
      let pdfFileParameter: ApiClient.FileParameter;
      if (formData.pdfDocument instanceof File) {
        // If pdfDocument is a File object
        pdfFileParameter = {
          data: formData.pdfDocument,
          fileName: formData.pdfDocument.name,
        };
      } else if (typeof formData.pdfDocument === 'string') {
        // If pdfDocument is a base64 data URL
        const blob = dataURLtoBlob(formData.pdfDocument);
        pdfFileParameter = {
          data: blob,
          fileName: 'document.pdf', // Use a default filename or extract from data URL if available
        };
      } else {
        throw new Error('No pdfDocument provided.');
      }

      const participantHandles = formData.participants.map((p) => p.handle!);

      if (handle) {
        // Update existing certificate
        await updateCertificate({
          handle: handle,
          type: formData.type!,
          validFrom: new Date(formData.validFrom),
          validTo: new Date(formData.validTo),
          supplierHandle: formData.supplier!.handle!,
          pdfDocument: pdfFileParameter,
          participantHandles: participantHandles,
        });

        notify('Certificate updated successfully', 'success');
      } else {
        await addCertificate({
          type: formData.type!,
          validFrom: new Date(formData.validFrom),
          validTo: new Date(formData.validTo),
          supplierHandle: formData.supplier!.handle!,
          pdfDocument: pdfFileParameter,
          participantHandles: participantHandles,
        });

        notify('Certificate created successfully', 'success');
      }

      navigate('/certificates');
    } catch (error) {
      console.log('Error submitting certificate:', error);
      notify('Error submitting certificate', 'error');
    }
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
    dispatch({ type: 'UPDATE_FIELD', field: 'pdfDocument', value: null });
  };

  const handleSupplierSelect = (supplier: Supplier) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'supplier',
      value: supplier,
    });
    setShowSupplierLookup(false);
  };

  const handleParticipantSelect = (participants: AssignedUser[]) => {
    dispatch({ type: 'ADD_ASSIGNED_USERS', users: participants });
    setShowParticipantLookup(false);
  };

  const handleRemoveAssignedUser = (index: number) => {
    dispatch({ type: 'REMOVE_ASSIGNED_USER', index });
  };

  const assignedUsersColumns: Column<AssignedUser>[] = [
    {
      header: '',
      accessor: '' as keyof AssignedUser,
      render: (
        _value: string | number,
        _row: AssignedUser,
        index: number,
      ) => (
        <button
          type="button"
          onClick={() => handleRemoveAssignedUser(index)}
        >
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
              value={formData.supplier ? formData.supplier.name : ''}
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
                dispatch({ type: 'UPDATE_FIELD', field: 'supplier', value: null })
              }
            >
              <RemoveIcon />
            </span>
          </div>

          <FormSelect
            label={t.certificateType}
            name="type"
            value={formData.type}
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
            label={t.validFrom}
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
              data={formData.participants}
            />
          </div>
          {
            handle ? <CommentSection
            comments={formData.comments}
            onAddComment={handleAddComment} 
          /> : ''
          }
          
        </div>
        <div className="form-right">
          <div className="upload-actions">
            <FileUpload
              onFileChange={handleFileChange}
              resetFile={resetFile}
              onFileRemove={handleFileRemove}
              file={formData.pdfDocument}
            />
          </div>

          <PDFPreview file={formData.pdfDocument} />
          <div className="form-action-buttons">
            <Button type="submit" variation="contained" size="medium">
              {handle ? t.update : t.save}
            </Button>
            {!handle ? (
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
