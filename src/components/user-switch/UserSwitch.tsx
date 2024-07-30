import { ChangeEvent, FC } from 'react';
import { useUser } from '../../context/UserContext';
import './user-switch.css';

const UserSwitch: FC = () => {
  const { currentUser, switchUser } = useUser();

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switchUser(event.target.value);
  };

  return (
    <div className="user-switch">
      <label htmlFor="user-select">User:</label>
      <select id="user-select" value={currentUser} onChange={handleUserChange}>
        <option value="User 1">User 1</option>
        <option value="User 2">User 2</option>
        <option value="User 3">User 3</option>
        <option value="User 4">User 4</option>
      </select>
    </div>
  );
};

export default UserSwitch;
