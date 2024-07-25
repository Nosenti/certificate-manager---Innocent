import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  initDB,
  getCertificates,
  addCertificate as addCertificateToDB,
  Certificate,
  updateCertificate as updateCertificateInDB,
} from '../data/db';
import { Certificate } from '../../types/types';

interface CertificatesContextType {
  certificates: Certificate[];
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (certificate: Certificate) => void;
}

const CertificateContext = createContext<CertificatesContextType | undefined>(
  undefined,
);

interface Props {
  children?: ReactNode;
}

function CertificateProvider({ children }: Props) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isDBReady, setIsDBReady] = useState<boolean>(false);

  useEffect(() => {
    const handleInitDB = async () => {
      try {
        const status = await initDB();
        setIsDBReady(status);
        if (status) {
          const storedCertificates = await getCertificates();
          const updatedCertificates = storedCertificates.map((cert, index) => ({
            ...cert,
            id: cert.id ?? Date.now(),
          }));
          setCertificates(storedCertificates);
        } else {
          console.log('Error: DB not initialized');
        }
      } catch (error) {
        console.error('DB initialization failed', error);
      }
    };

    handleInitDB();
  }, []);

  const addCertificate = async (certificate: Certificate) => {
    if (!isDBReady) {
      return;
    }
    try {
      certificate.id = Date.now();
      await addCertificateToDB(certificate);
      const storedCertificates = await getCertificates();
      setCertificates(storedCertificates);
    } catch (error) {
      console.error('Error adding certificate', error);
    }
  };

  const updateCertificate = async (certificate: Certificate) => {
    try {
      await updateCertificateInDB(certificate);
      const storedCertificates = await getCertificates();
      setCertificates(storedCertificates);
    } catch (error) {
      console.log('Error editing a certificate', error);
    }
  };

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        addCertificate,
        updateCertificate,
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
