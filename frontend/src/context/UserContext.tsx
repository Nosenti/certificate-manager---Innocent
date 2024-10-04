// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useApi } from './ApiContext';
import { ApiClient } from '../services/ApiClient';

interface UserContextProps {
  users: ApiClient.UserDto[];
  currentUser: ApiClient.UserDto | null;
  switchUser: (userHandle: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { client } = useApi();
  const [users, setUsers] = useState<ApiClient.UserDto[]>([]);
  const [currentUser, setCurrentUser] = useState<ApiClient.UserDto | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromApi = await client.users(); 
        console.log("users before setting them: ", usersFromApi);
        setUsers(usersFromApi);

        if (usersFromApi.length > 0) {
          setCurrentUser(usersFromApi[0]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [client]);

  const switchUser = (userHandle: string) => {
    const user = users.find((u) => u.handle === userHandle);
    if (user) {
      setCurrentUser(user);
    } else {
      console.error('User not found with handle:', userHandle);
    }
  };

  return (
    <UserContext.Provider value={{ users, currentUser, switchUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
