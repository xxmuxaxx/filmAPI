import React from 'react';

import Auth from '../Auth/Auth';
import API from '../API/API';

const Profile = ({ user, onFormSubmit }) => {
  return !user ? <Auth onFormSubmit={onFormSubmit} /> : user.isAdmin ? <API /> : null;
};

export default Profile;
