import './certificate-table.css';
import { useCertificates } from '../../context/CertificateContext';
import Table from '../table/Table';
import Button from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Certificate as BaseCertificate } from '../../../types/types';
import CogIcon from '../../../public/assets/cog.svg';
import { useEffect, useRef, useState } from 'react';

interface Column<T> {
  Header: string;
  accessor: keyof T;
  render?: (row: T, rowIndex: number) => React.ReactNode;
}

interface Certificate extends BaseCertificate {
  actions: React.ReactNode;
}

const CertificatesTable: React.FC = () => {
  const { certificates } = useCertificates();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleEdit = (id: number) => {
    navigate(`/certificates/edit/${id}`);
  };

  const handleDropdownToggle = (index: number) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const columns: Column<Certificate>[] = [
    {
      Header: ' ',
      accessor: 'actions',
      render: (row, rowIndex) => (
        <div
          className="cog-container"
          onClick={() => handleDropdownToggle(rowIndex)}
          ref={ dropdownRef}
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
    actions: null,
  }));

  return (
    <section className="certificates-table" aria-labelledby="certificatesTitle">
      <h1>Certificates</h1>
      <span className="new-certificate">
        <Button variation="contained" size="medium">
          <Link
            to="/new-certificate"
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
