import './Example.css';
import certificates_ from '../../data/certificates-table';
import { useEffect, useState } from 'react';
import Table from '../table/Table';
import Button from '../button/Button';
import FormPage from '../certificate-form/CertificateForm';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {useCertificates} from '../context/CertificateContext';

const columns = [
  { Header: 'Supplier', accessor: 'supplier' },
  { Header: 'Certificate type', accessor: 'certificateType' },
  { Header: 'Valid from', accessor: 'validFrom' },
  { Header: 'Valid to', accessor: 'validTo' },
];

const CertificatesTable: React.FC = () => {
  const { certificates, deleteCertificate } = useCertificates();
  
  const dataWithActions = certificates.map((cert) => ({
    ...cert,
    actions: (
      <div className="cog-container">
        +
        <div className="dropdown-menu">
          <button>Edit</button>
          <button onClick={() => handleDelete(cert.id!)}>Delete</button>
        </div>
      </div>
    )
  }));

  const handleDelete = async (id: number) => {
    await deleteCertificate(id);
  };

  return <Table columns={columns} data={dataWithActions} onDelete={handleDelete} />;
};

/**
 * Example - content wrapper for the certificates table
 * Description - Component which has the certificates table
 * and create certificate button
 * @returns JSX Element
 */

const Example: React.FC = () => {
  
  return (
   
    <div className="ex">
      <h1>Example 1</h1>
      <Button variation='contained' size='medium'>
         <Link to="/certificates/new" style={{ color: 'inherit', textDecoration: 'none' }}>Add New Certificate</Link>
      </Button>
     
      <CertificatesTable/>
      <Routes>
        <Route path="certificates/new" element={<FormPage />} />
        <Route path="certificates/edit/:id" element={<FormPage />} />
      </Routes>
      </div>
     
  );
};

export default Example;
