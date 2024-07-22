import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import certificates_ from '../../data/certificates-table';

interface Certificate {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
}

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

  useEffect(() => {
    setCertificates(certificates_);
  }, []);

  const addCertificate = (certificate: Certificate) => {
    const newCertificates = [...certificates, certificate];
    setCertificates(newCertificates);
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
