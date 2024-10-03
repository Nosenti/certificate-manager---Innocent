import React from 'react';
import { Supplier } from '../../../types/types';
import { UUID } from 'crypto';

interface SupplierRowSelectProps {
  suppliers: Supplier[];
  selectedSupplier: Supplier | null;
  onRowSelect: (supplier: Supplier) => void;
  handle?: UUID;
}

const SupplierRowSelect: React.FC<SupplierRowSelectProps> = ({
  suppliers,
  selectedSupplier,
  onRowSelect,
  handle,
}) => {
  const row = suppliers.find((supplier) => supplier.handle === handle);
  return row ? (
    <input
      type="radio"
      name="supplier"
      checked={selectedSupplier?.handle === row.handle}
      onChange={() => onRowSelect(row)}
    />
  ) : null;
};

export default SupplierRowSelect;
