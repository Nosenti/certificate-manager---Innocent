import React, { useState } from 'react';
import { Participant } from '../../../types/types';
import './participant-lookup.css';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import Table from '../table/Table';
import TextInput from '../text-input/TextInput';
import { useLanguage } from '../../context/LanguageContext';
import { useApi } from '../../context/ApiContext';

interface ParticipantLookupProps {
  show: boolean;
  onClose: () => void;
  onSelect: (participants: Participant[]) => void;
}

const ParticipantLookup: React.FC<ParticipantLookupProps> = ({
  show,
  onClose,
  onSelect,
}) => {
  const [filters, setFilters] = useState({
    name: '',
    userID: '',
    department: '',
    plant: '',
  });
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
  const { t } = useLanguage();
  const { client } = useApi();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const { name,  userID, department, plant } = filters;
    try {
      const results = await client.participants(name, userID, department, plant);
      setParticipants(results);
    } catch (error) {
      console.error("Error fetching participants: ", error);
    }
  };

  const handleReset = () => {
    setFilters({ name: '', userID: '', department: '', plant: '' });
    setParticipants([]);
    setSelectedParticipants([]);
  };

  const handleRowSelect = (participant: Participant) => {
    setSelectedParticipants((prev) =>
      prev.find((p) => p.handle === participant.handle)
        ? prev.filter((p) => p.handle !== participant.handle)
        : [...prev, participant]
    );
  };

  const handleSelectClick = () => {
    if (selectedParticipants.length > 0) {
      onSelect(selectedParticipants);
      onClose();
    }
  };

  const columns = [
    {
      header: '',
      accessor: 'select' as keyof Participant,
      render: (_:any,row: Participant) => (
        <input
          type="checkbox"
          checked={!!selectedParticipants.find((p) => p.handle === row.handle)}
          onChange={() => handleRowSelect(row)}
        />
      ),
    },
    { header: t.name, accessor: 'name' as keyof Participant },
    { header: t.userId, accessor: 'userId' as keyof Participant },
    { header: t.department, accessor: 'department' as keyof Participant },
    { header: t.plant, accessor: 'plant' as keyof Participant },
  ];

  return (
    <Modal show={show} title="Search for persons" onClose={onClose}>
      <div className="participant-lookup">
        <div className="search-criteria">
          <div className="search-criteria-title">{ t.searchCriteria}</div>
          <div className="search-inputs">
            <TextInput
              label={t.name}
              name="name"
              value={filters.name}
              onChange={handleInputChange}
            />
            
            <TextInput
              label={t.userId}
              name="userID"
              value={filters.userID}
              onChange={handleInputChange}
            />
            <TextInput
              label={t.department}
              name="department"
              value={filters.department}
              onChange={handleInputChange}
            />
            <TextInput
              label={t.plant}
              name="plant"
              value={filters.plant}
              onChange={handleInputChange}
            />
          </div>

          <div className="participant-btns">
            <Button size="medium" onClick={handleSearch}>
              {t.search}
            </Button>
            <Button
              size="medium"
              variation="transparent"
              onClick={handleReset}
            >
              {t.reset}
            </Button>
          </div>
        </div>
        <div className="participant-list">
          <div className="search-criteria-title">Person list</div>
          {participants.length > 0 ? (
            <Table<Participant>
              columns={columns}
              data={participants}
            />
          ) : (
            <p>No participants</p>
          )}
        </div>
        <div className="participant-list-actions">
          <Button
            variation="contained"
            size="medium"
            onClick={handleSelectClick}
            disabled={selectedParticipants.length === 0}
          >
            {t.select}
          </Button>
          <Button
            size="medium"
            variation="transparent"
            onClick={onClose}
          >
            {t.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ParticipantLookup;
