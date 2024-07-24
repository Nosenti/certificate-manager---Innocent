let db: IDBDatabase | null = null;
const version = 1;

export interface Certificate {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
}

export enum Stores {
  Certificates = 'certificates',
}

export const initDB = async (): Promise<boolean> => {
  try {
    console.log('start DB initialization...');
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(Stores.Certificates, version);

      request.onupgradeneeded = () => {
        db = request.result;
        console.log('Upgrading or initializing database', db);

        if (!db.objectStoreNames.contains(Stores.Certificates)) {
          console.log('Creating certificates store');
          db.createObjectStore(Stores.Certificates, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      };
      console.log('request: ', request);
      request.onsuccess = () => {
        db = request.result;
        console.log('request.onsuccess - initDB', db.version);
        resolve(true);
      };

      request.onerror = () => {
        console.error('Error opening IndexedDB', request.error);
        reject(false);
      };
    });
  } catch (error) {
    console.error('Error during initDB', error);
    return false;
  }
};

export const getCertificates = async (): Promise<Certificate[]> => {
  if (!db) {
    throw new Error('DB is not initialized');
  }

  return new Promise((resolve, reject) => {
    const transaction = db?.transaction([Stores.Certificates], 'readonly');
    const store = transaction?.objectStore(Stores.Certificates);
    const request = store?.getAll();
    if (!request) {
      console.log('Request error');
      return;
    }
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addCertificate = async (
  certificate: Certificate,
): Promise<void> => {
  if (!db) {
    throw new Error('DB is not initialized');
  }
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([Stores.Certificates], 'readwrite');
    const store = transaction.objectStore(Stores.Certificates);
    const request = store.add(certificate);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
