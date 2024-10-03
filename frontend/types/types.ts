import { UUID } from "crypto";

export interface AssignedUser {
  handle: UUID,
  name: string;
  department: string;
  email: string;
}
export interface Certificate {
  handle: UUID;
  supplier: string;
  type: string;
  validFrom: string;
  validTo: string;
  pdfDocument: string | null;
  participants: AssignedUser[];
  comments: { certificateHandle: UUID; userHandle: UUID;  text: string }[];
}

export interface Supplier {
  handle: UUID;
  name: string;
  index: string;
  city: string
}

export interface Participant {
  handle: UUID;
  name: string;
  firstName: string;
  userId: string;
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

  handle: UUID;
  supplierName: string;
  supplierIndex: string;
  city: string
}

export interface Participant {

  handle: UUID;
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
