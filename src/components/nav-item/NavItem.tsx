import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import "./NavItem.css";

interface NavItemProps {
	to: string;
	icon: React.ReactNode;
	onClick: () => void;
	children: React.ReactNode
}

const NavItem: FC<NavItemProps> = ({ to, icon, onClick, children }) => {
  return (
	<NavLink className="nav-item" to={to} onClick={onClick}>
      <span className="icon">{icon}</span>
      <span>{children}</span>
    </NavLink>
  )
}

export default NavItem
