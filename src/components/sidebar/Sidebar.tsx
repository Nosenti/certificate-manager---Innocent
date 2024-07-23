import './sidebar.css';
import SidebarHeader from '../sidebar-header/SidebarHeader';
import NavItem from '../nav-item/NavItem';
import ExpandableSection from '../expandable/ExpandableSection';
import MLIcon from '../../../public/assets/mlicon.svg';
import HomeIcon from '../../../public/assets/homeicon.svg';
import { useLocation } from 'react-router-dom';
import { FC, useState } from 'react';

interface SidebarProps {
  closeSidebar: () => void;
}

/**
 * Sidebar - Sidebar of the app
 * Description - Contains sidebar components: SidebarHeader, NavigationItems
 * @param closeSidebar - manages the toggle of the sidebar on mobile view
 * @returns JSX Element
 */
const Sidebar: FC<SidebarProps> = ({ closeSidebar }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionToggle = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const navItems = [
    {
      path: "/example1",
      name: "Example 1",
    },
    {
      path: "/example2",
      name: "Example 2",
    },
    {
      path: "/example3",
      name: "Example 3",
    },
  ];

  return (
    <>
      <SidebarHeader />
      <div className="sidebar-wrapper">
        <div>
          <NavItem
            to="/"
            icon={<HomeIcon />}
            onClick={() => {
              closeSidebar();
              setActiveSection(null);
            }}
            isActive={location.pathname === '/'}
          >
            Start
          </NavItem>
          <ExpandableSection
            title="Machine Learning"
            icon={<MLIcon />}
            initialSelected="/example1"
            isActive={activeSection === 'ml'}
            onToggle={() => handleSectionToggle('ml')}
          >
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                isActive={location.pathname === item.path}
              >
                {item.name}
              </NavItem>
            ))}
          </ExpandableSection>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
