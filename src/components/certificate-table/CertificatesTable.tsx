import './certificate-table.css';
import certificatesData from '../../data/certificates-table';
import Table from '../table/Table';

interface Certificate {
  id: string;
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
  return (
    <section className="certificates-table" aria-labelledby="certificatesTitle">
      <h1>Certificates</h1>
      <Table columns={columns} data={certificatesData} />
    </section>
  );
}

export default CertificatesTable;
