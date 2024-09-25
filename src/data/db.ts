import { Certificate, Supplier, Participant } from '../../types/types';

let db: IDBDatabase | null = null;
const version = 3;

export enum Stores {
  Certificates = 'certificates',
  Suppliers = 'suppliers',
  Participants = 'participants',
  Users = 'users',
}

export const initDB = async (): Promise<boolean> => {
  try {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('CertificatesManagerDB', version);

      request.onupgradeneeded = () => {
        db = request.result;
        console.log('Upgrading or initializing database', db);

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
            console.log('Suppliers store created');
          };
        }

        if (!db.objectStoreNames.contains(Stores.Participants)) {
          const participantStore = db.createObjectStore(Stores.Participants, {
            keyPath: 'id',
            autoIncrement: true,
          });
          participantStore.transaction.oncomplete = () => {
            console.log('Participants store created');
          };
        }

        if (!db.objectStoreNames.contains(Stores.Users)) {
          const userStore = db.createObjectStore(Stores.Users, {
            keyPath: 'id',
            autoIncrement: true,
          });
          userStore.transaction.oncomplete = () => {
            console.log('Users store created');
          };
        }
      };

      request.onsuccess = () => {
        db = request.result;
        console.log('request.onsuccess - initDB', db.version);
        seedData(); // Seeding suppliers, participants, and users
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

// Seeding all data at the start of the application: suppliers, participants, and users
const seedData = () => {
  const suppliers: Supplier[] = [
    {
      id: 1,
      supplierName: 'ANDEMIS GmbH',
      supplierIndex: '1',
      city: 'Stuttgart',
    },
    { id: 2, supplierName: 'IMLER AG', supplierIndex: '2', city: 'Berlin' },
  ];

  if (db) {
    const supplierTransaction = db.transaction([Stores.Suppliers], 'readwrite');
    const supplierStoreTransaction = supplierTransaction.objectStore(
      Stores.Suppliers,
    );
    suppliers.forEach((supplier) => {
      supplierStoreTransaction.add(supplier);
    });
    console.log('Suppliers added');
  }

  const participants: Participant[] = [
    {
      id: 1,
      name: 'Simon',
      firstName: 'Zwölfer',
      userID: 'ZWOELF',
      department: 'ITM/FP',
      plant: '096',
      email: 'simon@example.com',
    },
    {
      id: 2,
      name: 'Wolfgang',
      firstName: 'Stork',
      userID: 'WOLFST',
      department: 'ITM/FP',
      plant: '094',
      email: 'wolfgang@example.com',
    },
    {
      id: 3,
      name: 'Hans',
      firstName: 'Müller',
      userID: 'MULLH',
      department: 'ITM/SD',
      plant: '098',
      email: 'hans@example.com',
    },
    {
      id: 4,
      name: 'Franz',
      firstName: 'Bauer',
      userID: 'BAUERF',
      department: 'ITM/SD',
      plant: '102',
      email: 'franz@example.com',
    },
    {
      id: 5,
      name: 'Klaus',
      firstName: 'Schmidt',
      userID: 'SCHMKL',
      department: 'ITM/FP',
      plant: '112',
      email: 'klaus@example.com',
    },
  ];

  if (db) {
    const participantTransaction = db.transaction(
      [Stores.Participants],
      'readwrite',
    );
    const participantStoreTransaction = participantTransaction.objectStore(
      Stores.Participants,
    );
    participants.forEach((participant) => {
      participantStoreTransaction.add(participant);
    });
    console.log('Participants added');
  }

  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
  ];

  if (db) {
    const userTransaction = db.transaction([Stores.Users], 'readwrite');
    const userStoreTransaction = userTransaction.objectStore(Stores.Users);
    users.forEach((user) => {
      userStoreTransaction.add(user);
    });
    console.log('Users added');
  }
};

export const getCertificates = async (): Promise<Certificate[]> => {
  return new Promise((resolve, reject) => {
    if (!db) throw new Error('DB is not initialized');

    const transaction = db.transaction([Stores.Certificates], 'readonly');
    const store = transaction.objectStore(Stores.Certificates);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// Add certificate
export const addCertificate = async (
  certificate: Certificate,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) throw new Error('DB is not initialized');

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
    if (!db) throw new Error('DB is not initialized');

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

// Delete certificate
export const deleteCertificate = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) throw new Error('DB is not initialized');

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
    if (!db) throw new Error('DB is not initialized');

    const transaction = db.transaction([Stores.Suppliers], 'readonly');
    const store = transaction.objectStore(Stores.Suppliers);
    const request = store.getAll();

    request.onsuccess = () => {
      let suppliers = request.result;
      if (supplierName)
        suppliers = suppliers.filter((supplier) =>
          supplier.supplierName
            .toLowerCase()
            .includes(supplierName.toLowerCase()),
        );
      if (supplierIndex)
        suppliers = suppliers.filter((supplier) =>
          supplier.supplierIndex
            .toLowerCase()
            .includes(supplierIndex.toLowerCase()),
        );
      if (city)
        suppliers = suppliers.filter((supplier) =>
          supplier.city.toLowerCase().includes(city.toLowerCase()),
        );
      resolve(suppliers);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getParticipants = async (
  name?: string,
  firstName?: string,
  userID?: string,
  department?: string,
  plant?: string,
): Promise<Participant[]> => {
  return new Promise((resolve, reject) => {
    if (!db) throw new Error('DB is not initialized');

    const transaction = db.transaction([Stores.Participants], 'readonly');
    const store = transaction.objectStore(Stores.Participants);
    const request = store.getAll();

    request.onsuccess = () => {
      let participants = request.result;
      if (name)
        participants = participants.filter((participant) =>
          participant.name.includes(name),
        );
      if (firstName)
        participants = participants.filter((participant) =>
          participant.firstName.includes(firstName),
        );
      if (userID)
        participants = participants.filter((participant) =>
          participant.userID.includes(userID),
        );
      if (department)
        participants = participants.filter((participant) =>
          participant.department.includes(department),
        );
      if (plant)
        participants = participants.filter((participant) =>
          participant.plant.includes(plant),
        );
      resolve(participants);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getUsers = async (): Promise<{ id: number; name: string }[]> => {
  return new Promise((resolve, reject) => {
    if (!db) throw new Error('DB is not initialized');

    const transaction = db.transaction([Stores.Users], 'readonly');
    const store = transaction.objectStore(Stores.Users);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
      console.log('Fetched users from IndexedDB:', request.result);
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
      console.log(`Supplier ${supplier.supplierName} added successfully`);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
