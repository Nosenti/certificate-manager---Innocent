export interface Certificate {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null
}

export interface Supplier {
  id: number;
  supplierName: string;
  supplierIndex: string;
  city: string
}

export interface Locale {
  language: string;
  english: string;
  german: string;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  home: string;
  save: string;
  certificateAction: string;
  allCertificates: string;
  newCertificate: string;
  certificates: string;
  addNewCertificate: string;
  editCertificate: string;
  edit: string;
  delete: string;
  upload: string;
  cancel: string;
  reset: string;
  select: string;
  search: string;
  searchCriteria: string;
  supplierList: string;
  supplierName: string;
  supplierIndex: string;
  city: string;
  searchForSuppliers: string;
<<<<<<< HEAD
  update: string;
  remove: string;
=======
>>>>>>> 18c6991 (task7-KAN-38 rebase 3/6)
}

export interface Locales {
  en: Locale;
  de: Locale;
}
