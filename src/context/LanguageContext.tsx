import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '../locales/en.json';
import de from '../locales/de.json';
import { Locales } from '../../types/types';

const locales: Locales = { en, de };

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');
  const t = locales[language as keyof Locales];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, useLanguage };
