export interface AssignedUser {
  id: number,
  name: string;
  department: string;
  email: string;
}
export interface Certificate {
  id: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
  assignedUsers: AssignedUser[];
  comments: { user: string; text: string }[];
}

export interface Supplier {
  id: number;
  supplierName: string;
  supplierIndex: string;
  city: string
}

export interface Participant {
  id: number;
  name: string;
  firstName: string;
  userID: string;
  department: string;
  plant: string;
  email: string;
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
  update: string;
  remove: string;
  addParticipant: string;
  name: string;
  department: string;
  email: string;
  searchPersons: string;
  firstName: string;
  lastName: string;
  plant: string;
  userId: string;
  newComment: string;
  comment: string;
  user: string;
  send: string;
}

export interface Locales {
  en: Locale;
  de: Locale;
}

export interface Supplier {
  id: number;
  supplierName: string;
  supplierIndex: string;
  city: string
}

export interface Participant {
  id: number;
  name: string;
  firstName: string;
  userID: string;
  department: string;
  plant: string;
  email: string;
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
  update: string;
  remove: string;
}

export interface Locales {
  en: Locale;
  de: Locale;
}
