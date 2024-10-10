import React, { createContext, useContext, ReactNode } from 'react';
import { ApiClient } from '../services/ApiClient';

const { Client } = ApiClient;

interface ApiContextProps {
	client: ApiClient.Client;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}

const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const client = new Client(process.env.REACT_APP_API_URL);

  return (
    <ApiContext.Provider value={{ client }}>
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export { ApiProvider, useApi };
