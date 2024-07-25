import './Example.css';
import Table from '../table/Table';
import Button from '../button/Button';
import FormPage from '../certificate-form/CertificateForm';
import CogIcon from "../../../public/assets/cog.svg";
import { BrowserRouter as Router,Route, Link, Routes } from 'react-router-dom';
import { useCertificates } from '../../context/CertificateContext';

const columns = [
  { Header: '', accessor: 'actions' },
  { Header: 'Supplier', accessor: 'supplier' },
  { Header: 'Certificate type', accessor: 'certificateType' },
  { Header: 'Valid from', accessor: 'validFrom' },
  { Header: 'Valid to', accessor: 'validTo' },
];

const CertificatesTable: React.FC = () => {
  const { certificates } = useCertificates();
  
  const dataWithActions = certificates.map((cert) => ({
    ...cert,
    actions: (
      <div className="cog-container">
        <CogIcon/>
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
