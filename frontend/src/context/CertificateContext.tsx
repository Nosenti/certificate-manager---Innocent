import { UUID } from 'crypto';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Certificate } from '../../types/types';
import {
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate
} from '../services/CertificatesService';


interface CertificatesContextType {
  certificates: Certificate[];
  addCertificate: (certificate: Certificate) => Promise<void>;
  updateCertificate: (certificate: Certificate) => Promise<void>;
  deleteCertificate: (handle: UUID) => Promise<void>;
}

const CertificateContext = createContext<CertificatesContextType | undefined>(
  undefined,
);

interface Props {
  children?: ReactNode;
}

function CertificateProvider({ children }: Props) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const certificates = await getCertificates();
      console.log("cert_: ", certificates);
      setCertificates(certificates);
    }

    fetchCertificates();
    
  }, []);

  const addCertificateHandler = async (certificate: Certificate) => {
    try {
      await addCertificate(certificate);
      // Refetch certificates after adding
      const fetchedCertificates = await getCertificates();
      setCertificates(fetchedCertificates);
    } catch (error) {
      console.error('Error adding certificate: ', error);
      throw new Error('Error adding certificate');
    }
  };

  const updateCertificateHandler = async (certificate: Certificate) => {
    try {
      await updateCertificate({ handle: certificate.handle, data: certificate });
      const fetchedCertificates = await getCertificates();
      setCertificates(fetchedCertificates);
    } catch (error) {
      console.error('Error updating certificate: ', error);
      throw new Error('Error editing a certificate');
    }
  };

  const deleteCertificateHandler = async (handle: UUID) => {
    try {
      await deleteCertificate(handle);
      const fetchedCertificates = await getCertificates();
      setCertificates(fetchedCertificates);
    } catch (error) {
      console.error('Error deleting certificate: ', error);
      throw new Error('Error deleting certificate');
    }
  };

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        addCertificate: addCertificateHandler,
        updateCertificate: updateCertificateHandler,
        deleteCertificate: deleteCertificateHandler,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
}

function useCertificates() {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error(
      'useCertificates must be used within a CertificatesProvider',
    );
  }
  return context;
}

export { CertificateProvider, useCertificates };

