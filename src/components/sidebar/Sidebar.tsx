import './sidebar.css';
import SidebarHeader from '../sidebar-header/SidebarHeader';
import NavItem from '../nav-item/NavItem';
import ExpandableSection from '../expandable/ExpandableSection';
import MLIcon from '../../../public/assets/mlicon.svg';
import HomeIcon from '../../../public/assets/homeicon.svg';
import { useLocation } from 'react-router-dom';
import { FC, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';


interface SidebarProps {
  closeSidebar: () => void;
}

interface NavItemType {
  path: string;
  name: string;
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
  const { t } = useLanguage();

  const handleSectionToggle = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const navItems: NavItemType[] = [
    {
      path: '/certificates',
      name: t.certificates,
    },
    {
      path: '/new-certificate',
      name: t.newCertificate,
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
            {t.home}
          </NavItem>
          <ExpandableSection
            title={t.certificateAction}
            icon={<MLIcon />}
            initialSelected="/certificates"
            isActive={activeSection === 'certificates'}
            onToggle={() => handleSectionToggle('certificates')}
          >
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                isActive={location.pathname.startsWith(item.path)}
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
