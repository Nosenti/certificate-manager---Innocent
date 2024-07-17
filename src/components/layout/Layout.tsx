import './Layout.css';

/**
 * Layout - Component that gives structure of the page
 * Description - Position other components on the UI: Sidebar, Topbar and the page content
 *
 */
const Layout = (): JSX.Element => {
  return (
    <div className="layout">
      <div className="sidebar"></div>
      <main>
        <div className="top-bar">Hello React!</div>
        <div className="body"></div>
      </main>
    </div>
  );
};

export default Layout;
