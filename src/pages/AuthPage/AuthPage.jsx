import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { env } from '../../services/environment';
import { Auth } from '../../components/Forms';
import { selectCurrentUser } from '../../redux/selectors/users';
import './AuthPage.scss';

export const AuthPage = () => {
  const currentUser = useSelector((state) => selectCurrentUser(state));
  const history = useHistory();

  React.useEffect(() => {
    currentUser && history.push(env.profile.baseUrl);
  }, [currentUser]);

  return <Auth />;
};
