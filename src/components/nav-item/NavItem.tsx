import { FC, ReactNode } from 'react';
import { NavLink} from 'react-router-dom';
import './navItem.css';

interface NavItemProps {
  to: string;
  icon?: ReactNode;
  onClick: () => void;
  children: ReactNode;
  isActive?: boolean;
}
/**
 * NavItem - Navigation Item
 * @param to - The link you navigate to
 * @param icon - Option Icon for the navigation link
 * @param onClick - onClick prop to navigate to another page
 * @returns
 */
const NavItem: FC<NavItemProps> = ({
  to,
  icon,
  onClick,
  children,
  isActive,
}) => {
  const classNames = `nav-item ${isActive ? 'active' : ''} ${to === '/' ? 'start' : ''}`;
  return (
    <NavLink className={classNames} to={to} onClick={onClick}>
      {icon && <span className="icon">{icon}</span>}
      <span>{children}</span>
    </NavLink>
  );
};

export default NavItem;
