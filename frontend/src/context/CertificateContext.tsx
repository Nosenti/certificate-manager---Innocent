import { UUID } from 'crypto';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Certificate } from '../../types/types';
import { ApiClient } from '../services/ApiClient';


const { CertificateDto, Client } = ApiClient;

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
const client = new Client(process.env.REACT_APP_API_URL);


function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

function formatDateForServer(date: Date): Date {
  const dateString = date.toISOString().split('T')[0];
  const dateCopy = new Date(date.getTime());
  dateCopy.toJSON = function() {
    return dateString;
  };

  return dateCopy;
}


function CertificateProvider({ children }: Props) {
  const [certificates, setCertificates] = useState<(typeof CertificateDto)[]>(
    [],
  );

  useEffect(() => {
    const fetchCertificates = async () => {
      const certificates = await client.certificatesAll();
      console.log('cert_: ', certificates);
      setCertificates(certificates);
    };

    fetchCertificates();
  }, []);

  const certificatesPOSTWrapper = (
  type: string,
  validFrom: Date,
  validTo: Date,
  supplierHandle: string,
  pdfDocument: ApiClient.FileParameter,
  participantHandles: string[]
): Promise<typeof CertificateDto> => {
  return new Promise<typeof CertificateDto>((resolve, reject) => {
    client
      .certificatesPOST(
        type,
        validFrom,
        validTo,
        supplierHandle,
        pdfDocument,
        participantHandles
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        if (
          error instanceof ApiClient.ApiException &&
          error.status === 201
        ) {
          // Treat 201 Created as success
          const responseBody = JSON.parse(error.response);
          resolve(responseBody as typeof CertificateDto);
        } else {
          reject(error);
        }
      });
  });
};


  const addCertificateHandler = async (certificateData: {
    type: string;
    validFrom: Date;
    validTo: Date;
    supplierHandle: string;
    pdfDocument: ApiClient.FileParameter;
    participantHandles: string[];
  }) => {
    try {
      const validFromDate = formatDateForServer(certificateData.validFrom);
    const validToDate = formatDateForServer(certificateData.validTo);

    
    if (
      !certificateData.participantHandles ||
      certificateData.participantHandles.length === 0
    ) {
      certificateData.participantHandles = []; 
    }
      const res = await certificatesPOSTWrapper(
      certificateData.type,
      validFromDate,
      validToDate,
      certificateData.supplierHandle,
      certificateData.pdfDocument,
      certificateData.participantHandles
    );
      try {
      const fetchedCertificates = await client.certificatesAll();
      setCertificates(fetchedCertificates);
    } catch (fetchError) {
      console.error('Error fetching certificates after adding:', fetchError);
    }
    } catch (error) {
      if (error instanceof ApiClient.ApiException) {
        console.error('API Error:', error.status, error.response);
      } else {
        console.error('Error adding certificate:', error);
      }
      throw new Error('Error adding certificate');
    }
  };

  const certificatesPATCHWrapper = (
  handle: string,
  type: string,
  validFrom: Date,
  validTo: Date,
  supplierHandle: string,
  pdfDocument: ApiClient.FileParameter,
  participantHandles: string[]
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    client
      .certificatesPATCH(
        handle,
        type,
        validFrom,
        validTo,
        supplierHandle,
        pdfDocument,
        participantHandles
      )
      .then(() => {
        resolve();
      })
      .catch((error) => {
        if (
          error instanceof ApiClient.ApiException &&
          (error.status === 200 || error.status === 204)
        ) {
          // Treat 200 OK and 204 No Content as success
          resolve();
        } else {
          reject(error);
        }
      });
  });
};


  const updateCertificateHandler = async (certificateData: {
  handle: string;
  type: string;
  validFrom: Date;
  validTo: Date;
  supplierHandle: string;
  pdfDocument: ApiClient.FileParameter;
  participantHandles: string[];
}) => {
  try {

    const validFromDate = formatDateForServer(certificateData.validFrom);
    const validToDate = formatDateForServer(certificateData.validTo);

    if (
      !certificateData.participantHandles ||
      certificateData.participantHandles.length === 0
    ) {
      certificateData.participantHandles = [];
    }
    await certificatesPATCHWrapper(
      certificateData.handle,
      certificateData.type,
      validFromDate,
      validToDate,
      certificateData.supplierHandle,
      certificateData.pdfDocument,
      certificateData.participantHandles
    );
    try {
      const fetchedCertificates = await client.certificatesAll();
      setCertificates(fetchedCertificates);
    } catch (fetchError) {
      console.error('Error fetching certificates after updating:', fetchError);
    }
  } catch (error) {
    if (error instanceof ApiClient.ApiException) {
      console.error('API Error:', error.status, error.response);
    } else {
      console.error('Error updating certificate:', error);
    }
    throw new Error('Error updating certificate');
  }
};


  const deleteCertificateHandler = async (handle: UUID) => {
    try {
      await client.certificatesDELETE(handle);
      const fetchedCertificates = await client.certificatesAll();
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

