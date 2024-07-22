import { FC } from 'react';
import "./Header.css"

interface HeaderProps {
  user?: string;
}

/**
 * Header - Header component to contain the user profile
 * Description - Should contain the quick to access info about the user
 *  
 */
const Header: FC<HeaderProps> = ({ user = 'John Doe' }) => {
  return (
    <div className="header">
      <div className="user-info">
        {user && <span className="">{user}</span>}
      </div>
    </div>
  );
};

export default Header;
