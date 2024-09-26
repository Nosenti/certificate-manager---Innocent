import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { getUsers, initDB } from '../../data/db';
import './user-switch.css';

const UserSwitch: FC = () => {
  const { currentUser, switchUser } = useUser();
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const initializeDBAndFetchUsers = async () => {
      try {
        const isDBInitialized = await initDB();
        if (isDBInitialized) {
          const usersFromDB = await getUsers();
          setUsers(usersFromDB);
        } else {
          console.error('Database initialization failed');
        }
      } catch (error) {
        console.error('Error initializing database or fetching users:', error);
      }
    };

    initializeDBAndFetchUsers();
  }, []);

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switchUser(event.target.value);
  };

  return (
    <div className="user-switch">
      <label htmlFor="user-select">User:</label>
      <select id="user-select" value={currentUser} onChange={handleUserChange}>
        {users.length > 0 ? (
          users.map((user) => (
            <option key={user.id} value={user.name}>
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
