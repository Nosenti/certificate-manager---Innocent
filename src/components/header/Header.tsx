import { FC } from 'react';
import './header.css';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import en from '../../locales/en.json';
import de from '../../locales/de.json';
import { Locales } from '../../../types/types';

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
  const location = useLocation();
  let routeTitle = '';

  if (location.pathname === '/new-certificate') {
    routeTitle = 'New Certificate';
  } else if (location.pathname.includes('/certificates/edit')) {
    routeTitle = 'Edit Certificate';
  } else if (location.pathname.includes('/certificates')) {
    routeTitle = 'All Certificates';
  } else if (location.pathname.includes('/')) {
    routeTitle = 'Home';
  }
  const { language, setLanguage } = useLanguage();
  const t = locales[language as keyof Locales];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>{routeTitle}</h2>
      </div>
      <div className="header-right">
        <div className="user-info">
          {user && <span className="user">{user}</span>}
        </div>
      </div>
      <div className="language-info">
        <p>language:</p>

        <span className='language-info-dropdown'>
          <select value={language} onChange={handleLanguageChange}>
          <option value="en">{t.english}</option>
          <option value="de">{t.german}</option>
        </select>
        </span>
        
      </div>
    </header>
  );
};

export default Header;
