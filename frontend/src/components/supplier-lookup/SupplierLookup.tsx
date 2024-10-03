import React, { useEffect, useState } from 'react';
// import { getSuppliers } from '../../data/db';
import { Supplier } from '../../../types/types';
import './supplier-lookup.css';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import Table from '../table/Table';
import TextInput from '../text-input/TextInput';
import SupplierRowSelect from '../supplier-row-select/SupplierRowSelect';
import CaretDown from '../../../public/assets/caret-down.svg';
import { useLanguage } from '../../context/LanguageContext';
import { getSuppliers } from '../../services/CertificatesService';
import { UUID } from 'crypto';


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
    name: '',
    index: '',
    city: '',
  });
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const { t } = useLanguage();

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { name, index, city } = filters;
      try {
        const results = await getSuppliers(name, index, city);
      setSuppliers(results);
      setFilteredSuppliers(results);
      } catch (error) {
        console.error("Error fetching suppliers: ", error);
      }
      
    };

    fetchSuppliers();
  }, [filters]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
  const { name, index, city } = filters;
  let results = suppliers;

  if (name)
    results = results.filter((supplier) =>
      supplier.supplierName.toLowerCase().includes(name.toLowerCase())
    );
  if (index)
    results = results.filter((supplier) =>
      supplier.index.toLowerCase().includes(index.toLowerCase())
    );
  if (city)
    results = results.filter((supplier) =>
      supplier.city.toLowerCase().includes(city.toLowerCase())
    );

  setFilteredSuppliers(results);
};

  const handleReset = () => {
    setFilters({ name: '', index: '', city: '' });
    setSuppliers([]);
    setSelectedSupplier(null);
  };

  const handleRowSelect = (supplier: Supplier) => {
    setSelectedSupplier(selectedSupplier?.handle === supplier.handle ? null : supplier);
  };

  const handleSelectClick = () => {
    if (selectedSupplier) {
      onSelect(selectedSupplier);
    }
  };

  const columns = [
    { header: t.supplierName, accessor: 'name' as keyof Supplier },
    { header: t.supplierIndex, accessor: 'index' as keyof Supplier },
    { header: t.city, accessor: 'city' as keyof Supplier },
  ];

  return (
    <Modal show={show} title={t.searchForSuppliers} onClose={onClose}>
      <div className="supplier-lookup">
        <div className="search-criteria">
          <div className="search-criteria-title">
            <span className='search-criteria-title-caret'>
              <CaretDown />
            </span>
            {t.searchCriteria}
          </div>
          <div className="search-inputs">
            <TextInput
              label={t.supplierName}
              name="name"
              value={filters.name}
              onChange={handleInputChange}
            />
            <TextInput
              label={t.supplierIndex}
              name="index"
              value={filters.index}
              onChange={handleInputChange}
            />
            <TextInput
              label={t.city}
              name="city"
              value={filters.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="supplier-btns">
            <Button size="medium" onClick={handleSearch}>
              {t.search}
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
            {t.supplierList}
          </div>
          {filteredSuppliers.length > 0 ? (
            <Table<Supplier>
              columns={columns}
              data={filteredSuppliers}
              render={(handle?: UUID) => (
                <SupplierRowSelect
                  suppliers={filteredSuppliers}
                  selectedSupplier={selectedSupplier}
                  onRowSelect={handleRowSelect}
                  handle={handle}
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
