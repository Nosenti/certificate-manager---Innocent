import React from 'react';
import { Supplier } from '../../../types/types';

interface SupplierRowSelectProps {
  suppliers: Supplier[];
  selectedSupplier: Supplier | null;
  onRowSelect: (supplier: Supplier) => void;
  id?: number;
}

const SupplierRowSelect: React.FC<SupplierRowSelectProps> = ({
  suppliers,
  selectedSupplier,
  onRowSelect,
  id,
}) => {
  const row = suppliers.find((supplier) => supplier.id === id);
  return row ? (
    <input
      type="radio"
      name="supplier"
      checked={selectedSupplier?.id === row.id}
      onChange={() => onRowSelect(row)}
    />
  ) : null;
};

export default SupplierRowSelect;
