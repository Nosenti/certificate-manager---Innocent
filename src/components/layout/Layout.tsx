import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

const Layout = (): JSX.Element => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = (): void => {
    setSidebarVisible(false);
  };

  return (
    <>
      <div className="body-container">
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
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
