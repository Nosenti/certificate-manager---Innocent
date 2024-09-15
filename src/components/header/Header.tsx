import { FC } from 'react';
import './header.css';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import en from '../../locales/en.json';
import de from '../../locales/de.json';
import { Locales } from '../../../types/types';
import UserSwitch from '../user-switch/UserSwitch';

const locales: Locales = { en, de };

interface HeaderProps {
  user?: string;
}

/**
 * Header - Header component to contain the user profile
 * Description - Should contain the quick to access info about the user
 *
 */
const Header: FC<HeaderProps> = ({ user = 'John Doe' }) => {
  const location = useLocation(); // Use the useLocation hook here
  const { language, setLanguage, t } = useLanguage();
  
  let routeTitle = '';

  if (location.pathname === '/new-certificate') {
    routeTitle = t.newCertificate;
  } else if (location.pathname.includes('/certificates/edit')) {
    routeTitle = t.editCertificate;
  } else if (location.pathname.includes('/certificates')) {
    routeTitle = t.allCertificates;
  } else if (location.pathname === '/') {
    // Match exact root path
    routeTitle = t.home;
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>{routeTitle}</h2>
      </div>
      <div className="header-right">
          <UserSwitch/>
        <div className="language-info">
          <p>Language:</p>
          <span className="language-info-dropdown">
            <select value={language} onChange={handleLanguageChange}>
              <option value="en">{t.english}</option>
              <option value="de">{t.german}</option>
            </select>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
