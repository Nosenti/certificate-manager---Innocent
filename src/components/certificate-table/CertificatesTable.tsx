import './certificate-table.css';
import { useCertificates } from '../../context/CertificateContext';
import Table from '../table/Table';
import Button from '../button/Button';
import CogIcon from '../../../public/assets/cog.svg';
import { Link } from 'react-router-dom';
import { Certificate } from '../../../types/types';

interface Column<T> {
  Header: string;
  accessor: keyof T;
}

const columns: Column[] = [
  { Header: ' ', accessor: 'actions' },
const columns: Column<Certificate>[] = [
  { Header: 'Supplier', accessor: 'supplier' },
  { Header: 'Certificate type', accessor: 'certificateType' },
  { Header: 'Valid from', accessor: 'validFrom' },
  { Header: 'Valid to', accessor: 'validTo' },
];

/**
 * Example - content wrapper for the certificates table
 * Description - Component which has the certificates table
 * and create certificate button
 * @returns JSX Element
 */

function CertificatesTable(): JSX.Element {
  const { certificates } = useCertificates();

  const dataWithActions = certificates.map((cert) => ({
    ...cert,
    actions: (
      <div className="cog-container">
        <CogIcon />
        <div className="dropdown-menu">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    ),
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

      <Table<Certificate> columns={columns} data={certificates} />
    </section>
  );
}

export default CertificatesTable;
