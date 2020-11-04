import React, { useState } from 'react';
import CreateFilm from '../../components/API/CreateFilm/CreateFilm';

import Auth from '../../components/Auth/Auth';

const users = [
  { name: 'admin', password: '111', isAdmin: true },
  { name: 'user', password: '111', isAdmin: false },
];

const ProfileContainer = () => {
  const [user, setUser] = useState(null);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const userName = event.target['user-name'];
    const password = event.target['password'];

    const user = users.find((user) => userName.value === user.name);

    if (user && password.value === user.password) {
      setUser({ ...user });
    } else {
      alert('Пароль или логин неверны');
    }
  };

  return <>{!user ? <Auth onFormSubmit={formSubmitHandler} /> : user.isAdmin ? <CreateFilm /> : null}</>;
};

export default ProfileContainer;
