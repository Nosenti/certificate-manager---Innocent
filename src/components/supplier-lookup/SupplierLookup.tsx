import React, { useState } from 'react';
import { getSuppliers } from '../../data/db';
import { Supplier } from '../../../types/types';
import './supplier-lookup.css';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import Table from '../table/Table';
import TextInput from '../text-input/TextInput';

interface SupplierLookupProps {
  show: boolean;
  onClose: () => void;
  onSelect: (supplier: Supplier) => void;
}

const SupplierLookup: React.FC<SupplierLookupProps> = ({
  show,
  onClose,
  onSelect,
}) => {
  const [filters, setFilters] = useState({
    supplierName: '',
    supplierIndex: '',
    city: '',
  });
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const { supplierName, supplierIndex, city } = filters;
    const results = await getSuppliers(supplierName, supplierIndex, city);
    setSuppliers(results);
  };

  const handleReset = () => {
    setFilters({ supplierName: '', supplierIndex: '', city: '' });
    setSuppliers([]);
    setSelectedSupplier(null);
  };

  const handleRowSelect = (supplier: Supplier) => {
    setSelectedSupplier(selectedSupplier?.id === supplier.id ? null : supplier);
  };

  const handleSelectClick = () => {
    if (selectedSupplier) {
      onSelect(selectedSupplier);
    }
  };

  const columns = [
    {
      Header: '',
      accessor: 'select' as keyof Supplier,
      render: (row: Supplier) => (
        <input
          type="radio"
          name="supplier"
          checked={selectedSupplier?.id === row.id}
          onChange={() => handleRowSelect(row)}
        />
      ),
    },
    { Header: 'Supplier name', accessor: 'supplierName' as keyof Supplier },
    { Header: 'Supplier index', accessor: 'supplierIndex' as keyof Supplier },
    { Header: 'City', accessor: 'city' as keyof Supplier },
  ];

  return (
    <Modal show={show} title="Search for suppliers" onClose={onClose}>
      <div className="supplier-lookup">
        <div className="search-criteria">
          <div className="search-criteria-title">Search Criteria</div>
          <div className="search-inputs">
            <TextInput
              label="Supplier name"
              name="supplierName"
              value={filters.supplierName}
              onChange={handleInputChange}
            />
            <TextInput
              label="Supplier index"
              name="supplierIndex"
              value={filters.supplierIndex}
              onChange={handleInputChange}
            />
            <TextInput
              label="City"
              name="city"
              value={filters.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="supplier-btns">
            <Button size="medium" onClick={handleSearch}>
              Search
            </Button>
            <Button
              size="medium"
              variation="transparent"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="supplier-list">
          <div className="search-criteria-title">Supplier list</div>
          {suppliers.length > 0 ? (
            <Table<Supplier>
              columns={columns}
              data={suppliers}
            />
          ) : (
            <p>No suppliers</p>
          )}
        </div>
        <div className="supplier-list-actions">
          <Button
            variation="contained"
            size="medium"
            onClick={handleSelectClick}
            disabled={!selectedSupplier}
          >
            Select
          </Button>
          <Button
            size="medium"
            variation="transparent"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SupplierLookup;
