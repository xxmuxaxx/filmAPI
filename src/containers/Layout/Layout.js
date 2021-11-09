import React from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={classes.Layout}>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
