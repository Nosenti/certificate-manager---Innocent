import React, { useState } from 'react';
import { getParticipants } from '../../data/db';
import { Participant } from '../../../types/types';
import './participant-lookup.css';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import Table from '../table/Table';
import TextInput from '../text-input/TextInput';

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
    firstName: '',
    userID: '',
    department: '',
    plant: '',
  });
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const { name, firstName, userID, department, plant } = filters;
    const results = await getParticipants(name, firstName, userID, department, plant);
    setParticipants(results);
  };

  const handleReset = () => {
    setFilters({ name: '', firstName: '', userID: '', department: '', plant: '' });
    setParticipants([]);
    setSelectedParticipants([]);
  };

  const handleRowSelect = (participant: Participant) => {
    setSelectedParticipants((prev) =>
      prev.find((p) => p.id === participant.id)
        ? prev.filter((p) => p.id !== participant.id)
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
          checked={!!selectedParticipants.find((p) => p.id === row.id)}
          onChange={() => handleRowSelect(row)}
        />
      ),
    },
    { header: 'Name', accessor: 'name' as keyof Participant },
    { header: 'First Name', accessor: 'firstName' as keyof Participant },
    { header: 'User ID', accessor: 'userID' as keyof Participant },
    { header: 'Department', accessor: 'department' as keyof Participant },
    { header: 'Plant', accessor: 'plant' as keyof Participant },
    { header: 'E-mail', accessor: 'email' as keyof Participant },
  ];

  return (
    <Modal show={show} title="Search for persons" onClose={onClose}>
      <div className="participant-lookup">
        <div className="search-criteria">
          <div className="search-criteria-title">Search Criteria</div>
          <div className="search-inputs">
            <TextInput
              label="Name"
              name="name"
              value={filters.name}
              onChange={handleInputChange}
            />
            <TextInput
              label="First name"
              name="firstName"
              value={filters.firstName}
              onChange={handleInputChange}
            />
            <TextInput
              label="User ID"
              name="userID"
              value={filters.userID}
              onChange={handleInputChange}
            />
            <TextInput
              label="Department"
              name="department"
              value={filters.department}
              onChange={handleInputChange}
            />
            <TextInput
              label="Plant"
              name="plant"
              value={filters.plant}
              onChange={handleInputChange}
            />
          </div>

          <div className="participant-btns">
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

export default ParticipantLookup;
