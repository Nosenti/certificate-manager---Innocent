interface FormData {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdf: File | null;
  assignedUsers?: { name: string; department: string; email: string }[];
}

export const validateForm = (formData: FormData) => {
  const errors: { [key: string]: string } = {};
  let isValid = true;

  if (!formData.supplier) {
    isValid = false;
    errors.supplier = 'Supplier is required';
  }

  if (!formData.certificateType) {
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

  if (!formData.pdf) {
    isValid = false;
    errors.pdf = 'PDF is required';
  }

  return { isValid, errors };
};
