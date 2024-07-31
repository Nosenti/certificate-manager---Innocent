import { FC } from 'react';
import './header.css';
import { useLocation } from 'react-router-dom';

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
  }  else if (location.pathname.includes('/certificates/edit')) {
    routeTitle = 'Edit Certificate';
  }
  else if (location.pathname.includes('/certificates')) {
    routeTitle = 'All Certificates';
  }
  else if (location.pathname.includes('/')) {
    routeTitle = 'Home';
  }
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
    </header>
  );
};

export default Header;
