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

function Example(): JSX.Element {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    setCertificates(certificates_);
  }, []);
  return (
    <div className="ex">
      <h1>Example 1</h1>
      <Button variation='contained' size='medium'>
         <Link to="/certificates/new" style={{ color: 'inherit', textDecoration: 'none' }}>Add New Certificate</Link>
      </Button>
     
      <Table columns={columns} data={certificates} />
      <Routes>
        <Route path="certificates/new" element={<FormPage />} />
      </Routes>
    </div>
  );
};

export default Example;
