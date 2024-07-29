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
        console.log('db: ', db);
        db = request.result;
        console.log('Upgrading or initializing database', db);

        if (!db.objectStoreNames.contains(Stores.Certificates)) {
          console.log('Creating certificates store');
          db.createObjectStore(Stores.Certificates, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }

        if (!db.objectStoreNames.contains(Stores.Suppliers)) {
          console.log('Creating suppliers store');
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
  

  return new Promise((resolve, reject) => {
    if (!db) {
      throw new Error('DB is not initialized');
    }
    const transaction = db.transaction([Stores.Certificates], 'readonly');
    const store = transaction.objectStore(Stores.Certificates);
    const request = store.getAll();
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

export const getSuppliers = async (
  supplierName?: string,
  supplierIndex?: string,
  city?: string,
): Promise<Supplier[]> => {

  return new Promise((resolve, reject) => {
    if (!db) {
      reject('DB is not initialized');
      return;
    }
    const transaction = db.transaction([Stores.Suppliers], 'readonly');
    const store = transaction.objectStore(Stores.Suppliers);
    const request = store.getAll();
    if (!request) {
      console.log('Request error');
      return;
    }
    request.onsuccess = () => {
      let suppliers = request.result;
      console.log("sup: ", suppliers);
      if (supplierName)
        suppliers = suppliers.filter((supplier) =>
          supplier.supplierName.includes(supplierName),
        );
      if (supplierIndex)
        suppliers = suppliers.filter((supplier) =>
          supplier.supplierIndex.includes(supplierIndex),
        );
      if (city)
        suppliers = suppliers.filter((supplier) =>
          supplier.city.includes(city),
        );
      resolve(suppliers);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
