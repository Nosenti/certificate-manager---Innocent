import { UUID } from "crypto";
import { AssignedUser } from "../../types/types";

interface FormData {
  handle?: UUID;
  supplier: string;
  type?: string;
  validFrom: string;
  validTo: string;
  pdfDocument: string | null;
  participants: AssignedUser[];
  comments: { userHandle: UUID; certificateHandle: UUID; text: string }[];
}

export const validateForm = (formData: FormData) => {
  const errors: { [key: string]: string } = {};
  let isValid = true;

  if (!formData.supplier) {
    isValid = false;
    errors.supplier = 'Supplier is required';
  }

  if (!formData.type) {
    isValid = false;
    errors.certificateType = 'Certificate type is required';
  }

  if (!formData.validFrom) {
    isValid = false;
    errors.validFrom = 'Valid from date is required';
  }

  if (!formData.validTo) {
    isValid = false;
    errors.validTo = 'Valid to date is required';
  }

  if (formData.validFrom > formData.validTo) {
    isValid = false;
    errors.validTo = 'End date should be after start date';
  }

  if (!formData.pdfDocument) {
    isValid = false;
    errors.pdf = 'PDF is required';
  }

  return { isValid, errors };
};
