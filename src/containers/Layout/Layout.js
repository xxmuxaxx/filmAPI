import React from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.css';

import { fetchCurrentUser } from '../../redux/actions/users';
import { getCookie } from '../../utils/functions';

const Layout = (props) => {
  const dispatch = useDispatch();

  if (getCookie('token')) {
    dispatch(fetchCurrentUser(getCookie('token')));
  }

  return (
    <div className={classes.Layout}>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
