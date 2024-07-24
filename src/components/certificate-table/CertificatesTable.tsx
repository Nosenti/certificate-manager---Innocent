import './certificate-table.css';
import { useCertificates } from '../../context/CertificateContext';
import Table from '../table/Table';
import Button from '../button/Button';
import { Link } from 'react-router-dom';

interface Certificate {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
}

interface Column {
  Header: string;
  accessor: keyof Certificate;
}

const columns: Column[] = [
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

  return (
    <section className="certificates-table" aria-labelledby="certificatesTitle">
      <h1>Certificates</h1>
      <span className='new-certificate'>
        <Button variation='contained' size='medium'>
         <Link to="/certificates/new" style={{ color: 'inherit', textDecoration: 'none' }}>Add New Certificate</Link>
      </Button>
      </span>
      
      <Table columns={columns} data={certificates} />
    </section>
  );
}

export default CertificatesTable;
