// src/components/user-switch/UserSwitch.tsx
import React, { ChangeEvent } from 'react';
import { useUser } from '../../context/UserContext';
import './user-switch.css';

const UserSwitch: React.FC = () => {
  const { users, currentUser, switchUser } = useUser();

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switchUser(event.target.value);
  };

  return (
    <div className="user-switch">
      <label htmlFor="user-select">User:</label>
      <select
        id="user-select"
        value={currentUser ? currentUser.handle : ''}
        onChange={handleUserChange}
      >
        {users.length > 0 ? (
          users.map((user) => (
            <option key={user.handle} value={user.handle}>
              {user.name}
            </option>
          ))
        ) : (
          <option disabled>No users available</option>
        )}
      </select>
    </div>
  );
};

export default UserSwitch;
