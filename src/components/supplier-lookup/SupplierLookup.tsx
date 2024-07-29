import React, { useEffect, useState } from 'react';
import { getSuppliers } from '../../data/db';
import { Supplier } from '../../../types/types';
import './supplier-lookup.css';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import Table from '../table/Table';
import TextInput from '../text-input/TextInput';
import SupplierRowSelect from '../supplier-row-select/SupplierRowSelect';
import CaretDown from '../../../public/assets/caret-down.svg';
import { useLanguage } from '../../context/LanguageContext';
import en from '../../locales/en.json';
import de from '../../locales/de.json';
import { Locales } from '../../../types/types';

const locales: Locales = { en, de };

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
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const { language } = useLanguage();

  const t = locales[language as keyof Locales];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
  const { supplierName, supplierIndex, city } = filters;
  let results = suppliers;

  if (supplierName)
    results = results.filter((supplier) =>
      supplier.supplierName.toLowerCase().includes(supplierName.toLowerCase())
    );
  if (supplierIndex)
    results = results.filter((supplier) =>
      supplier.supplierIndex.toLowerCase().includes(supplierIndex.toLowerCase())
    );
  if (city)
    results = results.filter((supplier) =>
      supplier.city.toLowerCase().includes(city.toLowerCase())
    );

  setFilteredSuppliers(results);
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
    { header: 'Supplier name', accessor: 'supplierName' as keyof Supplier },
    { header: 'Supplier index', accessor: 'supplierIndex' as keyof Supplier },
    { header: 'City', accessor: 'city' as keyof Supplier },
  ];

  return (
    <Modal show={show} title="Search for suppliers" onClose={onClose}>
      <div className="supplier-lookup">
        <div className="search-criteria">
          <div className="search-criteria-title">
            <span className='search-criteria-title-caret'>
              <CaretDown />
            </span>
            Search Criteria
          </div>
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
            <Button size="medium" variation="transparent" onClick={handleReset}>
              {t.reset}
            </Button>
          </div>
        </div>
        <div className="supplier-list">
          <div className="search-criteria-title">
            <span className='search-criteria-title-caret'>
              <CaretDown />
            </span>
            Supplier list
          </div>
          {filteredSuppliers.length > 0 ? (
            <Table<Supplier>
              columns={columns}
              data={filteredSuppliers}
              render={(id?: number) => (
                <SupplierRowSelect
                  suppliers={filteredSuppliers}
                  selectedSupplier={selectedSupplier}
                  onRowSelect={handleRowSelect}
                  id={id}
                />
              )}
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
            {t.select}
          </Button>
          <Button size="medium" variation="transparent" onClick={onClose}>
            {t.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SupplierLookup;
