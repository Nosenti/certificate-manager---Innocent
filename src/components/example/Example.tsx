import './Example.css';
import certificates_ from '../../data/certificates-table';
import { useEffect, useState } from 'react';
import Table from '../table/Table';

/**
 * Example - Placeholder for a component to be used
 *
 */

interface Certificate {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
}

const columns = [
  { Header: 'Supplier', accessor: 'supplier' },
  { Header: 'Certificate type', accessor: 'certificateType' },
  { Header: 'Valid from', accessor: 'validFrom' },
  { Header: 'Valid to', accessor: 'validTo' },
];

<<<<<<< HEAD
function Example(): JSX.Element {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    setCertificates(certificates_);
  }, []);
=======
const CertificatesTable: React.FC = () => {
  const { certificates } = useCertificates();
  
  const dataWithActions = certificates.map((cert) => ({
    ...cert,
    actions: (
      <div className="cog-container">
        +
        <div className="dropdown-menu">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    )
  }));

  return <Table columns={columns} data={dataWithActions} />;
};

/**
 * Example - content wrapper for the certificates table
 * Description - Component which has the certificates table
 * and create certificate button
 * @returns JSX Element
 */

const Example: React.FC = () => {
>>>>>>> 0827abf (task4-KAN-35 rebase 7/8)
  return (
    <div className="ex">
      <h1>Example 1</h1>
      <Button variation='contained' size='medium'>
         <Link to="/certificates/new" style={{ color: 'inherit', textDecoration: 'none' }}>Add New Certificate</Link>
      </Button>
     
      <Table columns={columns} data={certificates} />
      <Routes>
        <Route path="certificates/new" element={<FormPage />} />
        <Route path="certificates/edit/:id" element={<FormPage />} />
      </Routes>
    </div>
  );
};

export default Example;
