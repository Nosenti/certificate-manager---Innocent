import './certificate-table.css';
import { useCertificates } from '../../context/CertificateContext';
import useClickOutside from '../../hooks/useClickOutside';
import Table from '../table/Table';
import Button from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Certificate as BaseCertificate, Supplier } from '../../../types/types';
import React, { useMemo, useState } from 'react';
import ActionMenu from '../action-menu/ActionMenu';
import { useNotification } from '../../context/NotificationContext';
import Modal from '../confirm-modal/ConfirmModal';
import { useLanguage } from '../../context/LanguageContext';
import { UUID } from 'crypto';



interface Column {
  header: string;
  accessor: keyof Certificate;
  render?:(supplier:Supplier)=>React.ReactNode
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
  const [certificateToDelete, setCertificateToDelete] = useState<UUID | null>(null);
  const { t } = useLanguage();

  const handleEdit = (handle: UUID) => {
    handle && navigate(`/certificates/edit/${handle}`);
  };

  const handleDeleteClick = (handle: UUID) => {
    setCertificateToDelete(handle);
    setDeleteModalVisible(true);
  };

  const handleDropdownToggle = (index: number) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };
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
  const handleDelete = async (handle: UUID) => {
    await deleteCertificate(handle);
    notify('Certificate deleted successfully', 'success');
  };

  const handleClickOutside = () => {
    setDropdownVisible(null);
  };
  const dropdownRef = useClickOutside<HTMLDivElement>(handleClickOutside);

  const columns: Column[] = useMemo(() => [
    { header: t.supplier, accessor: 'supplier', render: (data) => <p>{data?.name }</p> },
    { header: t.certificateType, accessor: 'type' },
    { header: t.validFrom, accessor: 'validFrom' },
    { header: t.validTo, accessor: 'validTo' },
  ], [t]);

  const dataWithActions: Certificate[] = certificates.map((cert) => ({
    ...cert,
    actions: (
      <ActionMenu
        row={cert}
        onEdit={() => handleEdit(cert.handle)}
        onDelete={() => handleDelete(cert.handle)}
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
            {t.newCertificate}
          </Link>
        </Button>
      </span>
      <Table
        columns={columns}
        data={dataWithActions}
        render={(handle?: UUID) => {
          const row = certificates.find((cert) => cert.handle === handle);
          return row ? (
            <ActionMenu
              row={row}
              onEdit={() => handleEdit(row.handle)}
              onDelete={() => handleDeleteClick(row.handle)}
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
