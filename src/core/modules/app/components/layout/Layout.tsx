import './layout.scss';

import React, { FC } from 'react';

import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout: FC = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
