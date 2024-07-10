import React from 'react';

export default function Layout() {
  return (
    <div className="layout">
      <div className="sidebar"></div>
      <main>
        <div className="top-bar" style={{fontSize: '3rem'}}>Hello React!</div>
        <div className="body"></div>
      </main>
    </div>
  );
}
