import React, { useState } from 'react';
import Header from '../components/header/Header';
import SideNavV1 from '../components/sidenavV1/SideNavV1';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  const [navFolded, setNavFolded] = useState(false);

  const toggleSidebar = () => {
    setNavFolded((prev) => !prev);
  };

  return (
    <div className={`layout ${navFolded ? 'nav-folded' : ''}`}>
      <Header onToggleSidebar={toggleSidebar} />
      <SideNavV1 navFolded={navFolded} />      
      {/* Your main content */}
      <main>
        <div className='page-container'>
          <Outlet /> {/* This will render matched route component */}
        </div>
      </main>
    </div>
  );
};

export default DefaultLayout;
