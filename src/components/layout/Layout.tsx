import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import './Layout.css';

/**
 * Layout - Component which gives overall structure of the webpage
 * Description - Positions important components: sidebar, topbar and content on the page
 *
 */
const Layout = (): JSX.Element => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  /**
   * toggleSidebar - toggles sidebar to make it visible/invisible on mobile for responsive layout
   */
  const toggleSidebar = (): void => {
    setSidebarVisible(!sidebarVisible);
  };

  /**
   * closeSidebar - close the sidebar when the user clicks on navigation link on mobile
   */
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
          {sidebarVisible ? '≡' : '☰'}
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
