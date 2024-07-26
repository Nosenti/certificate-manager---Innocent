import './certificate-table.css';
import { useCertificates } from '../../context/CertificateContext';
import Table from '../table/Table';
import Button from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Certificate as BaseCertificate } from '../../../types/types';
import CogIcon from '../../../public/assets/cog.svg';
import { useState } from 'react';

interface Column<T> {
  Header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T, rowIndex: number) => React.ReactNode;
}

interface Certificate extends BaseCertificate {
  actions: React.ReactNode;
}

const CertificatesTable: React.FC = () => {
  const { certificates } = useCertificates();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    navigate(`/certificates/edit/${id}`);
  };

  const handleDropdownToggle = (index: number) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const columns: Column<Certificate>[] = [
    {
      Header: ' ',
      accessor: 'actions',
      render: (_, row, rowIndex) => (
        <div
          className="cog-container"
          onClick={() => handleDropdownToggle(rowIndex)}
        >
          <CogIcon />
          {dropdownVisible === rowIndex && (
            <div className="dropdown-menu">
              <button onClick={() => handleEdit(row.id)}>Edit</button>
              <button onClick={() => console.log('delete clicked')}>
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
    { Header: 'Supplier', accessor: 'supplier' },
    { Header: 'Certificate type', accessor: 'certificateType' },
    { Header: 'Valid from', accessor: 'validFrom' },
    { Header: 'Valid to', accessor: 'validTo' },
  ];

  const dataWithActions = certificates.map((cert) => ({
    ...cert,
    actions: null, // This will be replaced by the `render` function in columns
  }));

  return (
    <section className="certificates-table" aria-labelledby="certificatesTitle">
      <h1>Certificates</h1>
      <span className="new-certificate">
        <Button variation="contained" size="medium">
          <Link
            to="/certificates/new"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Add New Certificate
          </Link>
        </Button>
      </span>
      <Table<Certificate> columns={columns} data={dataWithActions} />
    </section>
  );
};

export default CertificatesTable;
