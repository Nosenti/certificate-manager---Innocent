import './Example.css';
import certificates_ from '../../data/certificates-table';
import { useEffect, useState } from 'react';
import Table from '../table/Table';

interface Certificate {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
}

const columns = [
  { Header: '', accessor: 'empty' },
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

function Example(): JSX.Element {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    setCertificates(certificates_);
  }, []);
  return (
    <div className="ex">
      <h1>Example 1</h1>
      <Table columns={columns} data={certificates} />
    </div>
  );
}

export default Example;
