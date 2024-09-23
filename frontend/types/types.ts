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
