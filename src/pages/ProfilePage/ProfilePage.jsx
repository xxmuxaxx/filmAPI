import React from 'react';
import Hero from '../../components/Hero/Hero';
import { Profile } from '../../components/Profile';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/selectors/users';
import { env } from '../../services/environment';

export const ProfilePage = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => selectCurrentUser(state));

  React.useEffect(() => {
    !currentUser && history.push(env.auth.baseUrl);
  }, [currentUser]);

  return (
    <>
      <Hero />
      <Profile />
    </>
  );
};
