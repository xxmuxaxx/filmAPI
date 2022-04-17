import './loginPage.scss';

import { RootState } from 'core/coreReducers';
import { env } from 'core/helpers/environment';
import { selectCurrentUser } from 'core/modules/users/selectors/usersSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Login from './components/login/Login';

const LoginPage = () => {
  const currentUser = useSelector<RootState>(selectCurrentUser);
  const history = useHistory();

  React.useEffect(() => {
    currentUser && history.push(env.profile.baseUrl);
  }, [currentUser]);

  return (
    <section className="login-section">
      <div className="login-section__container container">
        <div className="login-section__wrapper">
          <Login />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
