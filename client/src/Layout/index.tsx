import React from 'react';
import { Outlet } from 'react-router-dom';
import SmallHeader from './SmallHeader';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <>
      <SmallHeader />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
