import { Outlet } from 'react-router-dom';
import './Layout.css';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
/**
 * Layout - Component that gives structure of the page
 * Description - Position other components on the UI: Sidebar, Topbar and the page content
 *
 */
const Layout = (): JSX.Element => {
  return (
    <>
      <div className='body-container'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='middle'>
          <div className='header'>
            <Header />
          </div>
          <div className='content'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
