import './certificate-table.css';
import { useCertificates } from '../../context/CertificateContext';
import useClickOutside from '../../hooks/useClickOutside';
import Table from '../table/Table';
import Button from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Certificate as BaseCertificate } from '../../../types/types';
import { useMemo, useState } from 'react';
import ActionMenu from '../action-menu/ActionMenu';
import { useNotification } from '../../context/NotificationContext';
import Modal from '../confirm-modal/ConfirmModal';
import { useLanguage } from '../../context/LanguageContext';



interface Column {
  header: string;
  accessor: keyof Certificate;
}

interface Certificate extends BaseCertificate {
  actions: React.ReactNode;
}

const CertificatesTable: React.FC = () => {
  const { certificates, deleteCertificate } = useCertificates();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const { notify } = useNotification();
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [certificateToDelete, setCertificateToDelete] = useState<number | null>(null);
  const { t } = useLanguage();


  const handleEdit = (id: number) => {
    id && navigate(`/certificates/edit/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setCertificateToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDropdownToggle = (index: number) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(null);
  const handleDeleteConfirm = () => {
    if (certificateToDelete !== null) {
      deleteCertificate(certificateToDelete);
      notify('Certificate deleted successfully', 'success');
      setDeleteModalVisible(false);
      setCertificateToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setCertificateToDelete(null);
  };
  const handleDelete = (id: number) => {
    deleteCertificate(id);
    notify('Certificate deleted successfully', 'success');
  };

  const handleClickOutside = () => {
    setDropdownVisible(null);
  };
  const dropdownRef = useClickOutside<HTMLDivElement>(handleClickOutside);

  const columns: Column[] = useMemo(() => [
    { header: t.supplier, accessor: 'supplier' },
    { header: t.certificateType, accessor: 'certificateType' },
    { header: t.validFrom, accessor: 'validFrom' },
    { header: t.validTo, accessor: 'validTo' },
  ], [t]);

  const dataWithActions: Certificate[] = certificates.map((cert) => ({
    ...cert,
    actions: (
      <ActionMenu
        row={cert}
        onEdit={() => handleEdit(cert.id)}
        onDelete={() => handleDelete(cert.id)}
      />
    ),
  }));

  return (
    <section className="certificates-table" aria-labelledby="certificatesTitle">
      <h1>{t.certificates}</h1>
      <span className="new-certificate">
        <Button variation="contained" size="medium">
          <Link
            to="/new-certificate"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {t.addNewCertificate}
            {t.newCertificate}
          </Link>
        </Button>
      </span>
      <Table
        columns={columns}
        data={dataWithActions}
        render={(id?: number) => {
          const row = certificates.find((cert) => cert.id === id);
          return row ? (
            <ActionMenu
              row={row}
              onEdit={() => handleEdit(row.id)}
              onDelete={() => handleDeleteClick(row.id)}
            />
          ) : null;
        }}
      />
      <Modal
        show={deleteModalVisible}
        title="Confirm Delete"
        message="Are you sure you want to delete this certificate? This action is irreversible"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </section>
  );
};

export default CertificatesTable;
