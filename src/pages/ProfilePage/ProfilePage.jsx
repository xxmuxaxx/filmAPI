import React from 'react';
import ProfileContainer from '../../containers/ProfileContainer/ProfileContainer';
import Hero from '../../components/Hero/Hero';

export const ProfilePage = (props) => {
  return (
    <>
      <Hero />
      <ProfileContainer {...props} />
    </>
  );
};
