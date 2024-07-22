import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import './layout.css';
import PlusIcon from '../../../public/assets/plus.svg';
import CloseIcon from '../../../public/assets/close.svg';
import { CertificateProvider } from '../context/CertificateContext';

/**
 * Layout - Component which gives overall structure of the webpage
 * Description - Positions important components: sidebar, topbar and content on the page
 *
 */
const Layout = (): JSX.Element => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = (): void => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = (): void => {
    setSidebarVisible(false);
  };

  return (
    <>
      <div className="layout-container">
        <button
          className="toggle-button"
          onClick={toggleSidebar}
          aria-label={sidebarVisible ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={sidebarVisible}
        >
          {sidebarVisible ? <CloseIcon /> : <PlusIcon />}
        </button>
        <aside className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </aside>
        <main className="main-content">
          <Header />
          <section className="content">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default Layout;
