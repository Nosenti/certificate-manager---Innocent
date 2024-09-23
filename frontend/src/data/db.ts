import { Certificate, Supplier } from '../../types/types';

let db: IDBDatabase | null = null;
const version = 1;

export enum Stores {
  Certificates = 'certificates',
  Suppliers = 'suppliers',
}

export const initDB = async (): Promise<boolean> => {
  try {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('CertificatesManagerDB', version);

      request.onupgradeneeded = () => {
        db = request.result;

        if (!db.objectStoreNames.contains(Stores.Certificates)) {
          db.createObjectStore(Stores.Certificates, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }

        if (!db.objectStoreNames.contains(Stores.Suppliers)) {
          const supplierStore = db.createObjectStore(Stores.Suppliers, {
            keyPath: 'id',
            autoIncrement: true,
          });

          supplierStore.transaction.oncomplete = () => {
            const supplierTransaction = db!.transaction(
              [Stores.Suppliers],
              'readwrite',
            );
            const supplierStoreTransaction = supplierTransaction.objectStore(
              Stores.Suppliers,
            );

            const suppliers: Supplier[] = [
              {
                id: 1,
                supplierName: 'ANDEMIS GmbH',
                supplierIndex: '1',
                city: 'Stuttgart',
              },
              {
                id: 2,
                supplierName: 'IMLER AG',
                supplierIndex: '2',
                city: 'Berlin',
              },
            ];
            suppliers.forEach((supplier) => {
              supplierStoreTransaction.add(supplier);
            });
          };
        }
      };

      request.onsuccess = () => {
        db = request.result;
        resolve(true);
      };

      request.onerror = () => {
        reject(false);
      };
    });
  } catch (error) {
    throw new Error('Error during initDB');
  }
};

export const getCertificates = async (): Promise<Certificate[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      throw new Error('DB is not initialized');
    }
    const transaction = db.transaction([Stores.Certificates], 'readonly');
    const store = transaction.objectStore(Stores.Certificates);
    const request = store.getAll();
    if (!request) {
      throw new Error('Request error');
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
  return new Promise((resolve, reject) => {
    if (!db) {
      throw new Error('DB is not initialized');
    }
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

export const updateCertificate = async (
  certificate: Certificate,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('DB is not initialized');
      return;
    }
    const transaction = db.transaction([Stores.Certificates], 'readwrite');
    const store = transaction.objectStore(Stores.Certificates);
    const request = store.put(certificate);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteCertificate = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('DB is not initialized');
      return;
    }
    const transaction = db.transaction([Stores.Certificates], 'readwrite');
    const store = transaction.objectStore(Stores.Certificates);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getSuppliers = async (): Promise<Supplier[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      throw new Error('DB is not initialized');
    }
    const transaction = db.transaction([Stores.Suppliers], 'readonly');
    const store = transaction.objectStore(Stores.Suppliers);
    const request = store.getAll();
    if (!request) {
      throw new Error('Request error');
    }
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addSupplier = async (supplier: Supplier): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('DB is not initialized');
      return;
    }
    const transaction = db.transaction([Stores.Suppliers], 'readwrite');
    const store = transaction.objectStore(Stores.Suppliers);
    const request = store.add(supplier);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
