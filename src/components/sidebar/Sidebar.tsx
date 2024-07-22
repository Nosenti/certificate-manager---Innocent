import './sidebar.css';
import SidebarHeader from '../sidebar-header/SidebarHeader';
import NavItem from '../nav-item/NavItem';
import ExpandableSection from '../expandable/ExpandableSection';
import { ReactComponent as MLIcon } from '../../../public/assets/mlicon.svg';
import { ReactComponent as HomeIcon } from '../../../public/assets/homeicon.svg';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

interface SidebarProps {
  closeSidebar: () => void;
}

/**
 * Sidebar - Sidebar of the app
 * Description - Contains sidebar components: SidebarHeader, NavigationItems
 * @param closeSidebar - manages the toggle of the sidebar on mobile view
 * @returns JSX Element
 */
const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionToggle = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

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
            <NavItem
              to="/example1"
              onClick={closeSidebar}
              isActive={location.pathname === '/example1'}
            >
              Example 1
            </NavItem>
            <NavItem
              to="/example2"
              onClick={closeSidebar}
              isActive={location.pathname === '/example2'}
            >
              Example 2
            </NavItem>
            <NavItem
              to="/example3"
              onClick={closeSidebar}
              isActive={location.pathname === '/example3'}
            >
              Example 3
            </NavItem>
          </ExpandableSection>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
