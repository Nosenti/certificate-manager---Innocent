import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

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
  const toggleSidebar = ():void => {
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
      <div className="body-container">
        <button className="toggle-button" onClick={toggleSidebar}>
          
            { sidebarVisible?'x':'+'}
          
          
        </button>
        <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>
        <div className="middle">
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
