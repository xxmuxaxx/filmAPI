import React from 'react';
import {useDispatch} from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.css';

import {fetchUser} from '../../redux/actions/users';
import {getCookie} from '../../utils/functions';

const Layout = (props) => {
    const dispatch = useDispatch();

    if (getCookie('login')) {
        const login = getCookie('login');
        const password = getCookie('password');

        dispatch(fetchUser({login, password}));
    }

    return (
        <div className={classes.Layout}>
            <Header/>
            <main>{props.children}</main>
            <Footer/>
        </div>
    );
};

export default Layout;
