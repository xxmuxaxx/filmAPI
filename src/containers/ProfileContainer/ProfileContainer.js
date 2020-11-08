import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie } from '../../App';

import Auth from '../../components/Auth/Auth';
import Profile from '../../components/Profile/Profile';

import { fetchUpdateUserAvatar, fetchUser, setUser } from '../../redux/actions/users';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ users }) => users);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const login = event.target['user-name'].value;
    const password = event.target['password'].value;

    dispatch(fetchUser({ login, password }));
  };

  const imageChangeHandler = (event) => {
    const formData = new FormData();

    formData.append('avatar', event.target.files[0]);
    formData.append('id', user.id);
    user.avatar && formData.append('url', user.avatar.split('/').reverse()[0]);

    dispatch(fetchUpdateUserAvatar(formData));
  };

  const buttonClickHandler = () => {
    dispatch(setUser(null));
    deleteCookie('login');
    deleteCookie('password');
  };

  return !user ? (
    <Auth onFormSubmit={formSubmitHandler} />
  ) : (
    <Profile
      onFormSubmit={formSubmitHandler}
      onImageChange={imageChangeHandler}
      onButtonClick={buttonClickHandler}
      user={user}
    />
  );
};

export default ProfileContainer;
