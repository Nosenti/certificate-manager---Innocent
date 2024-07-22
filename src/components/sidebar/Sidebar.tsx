import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useState } from 'react';
import SidebarHeader from '../sidebar-header/SidebarHeader';
import NavItem from '../nav-item/NavItem';
import HomeIcon from '../home-icon/HomeIcon';
import ExpandableSection from '../expandable/ExpandableSection';
import MLIcon from '../ml-icon/MLIcon';

interface SidebarProps {
  closeSidebar: () => void;
}

/**
 * Sidebar - Sidebar of the app
 * Description - Contains sidebar components: SidebarHeader, NavigationItems
 * @param closeSidebar - manages the the toggle of the sidebar on mobile view
 * @returns JSX Element
 */
function Sidebar({ closeSidebar }: SidebarProps): JSX.Element {
  return (
    <>
      <SidebarHeader />
      <div className="sidebar-wrapper">
        <div>
          <NavItem to="/" icon={<HomeIcon />} onClick={closeSidebar}>
            Start
          </NavItem>
          <ExpandableSection title="Machine Learning" icon={<MLIcon />}>
            <NavItem to="/example1" onClick={closeSidebar}>
              Example 1
            </NavItem>
            <NavItem to="/example2" onClick={closeSidebar}>
              Example 2
            </NavItem>
            <NavItem to="/example3" onClick={closeSidebar}>
              Example 3
            </NavItem>
          </ExpandableSection>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
