import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { initDB, getCertificates, addCertificate as addCertificateToDB, Certificate } from '../data/db';

interface CertificatesContextType {
  certificates: Certificate[];
  addCertificate: (certificate: Certificate) => void;
}

// 1) Create Context
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
          setCertificates(storedCertificates);
        } else {
          console.log("Error: DB not initialized");
        }
      } catch (error) {
        console.error("DB initialization failed", error);
      }
    };

    handleInitDB();
  }, []);

  const addCertificate = async (certificate: Certificate) => {
    if (!isDBReady) {
      return;
    }
    try {
      const certificateWithId = { ...certificate, id: certificate.id ?? Date.now() };
      await addCertificateToDB(certificateWithId);
      const storedCertificates = await getCertificates();
      setCertificates(storedCertificates);
    } catch (error) {
      console.error("Error adding certificate", error);
    }
  };

  return (
    // 2) Provide value to child components
    <CertificateContext.Provider
      value={{
        certificates,
        addCertificate,
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
