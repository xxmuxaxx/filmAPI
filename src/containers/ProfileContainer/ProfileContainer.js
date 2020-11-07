import React, { useState } from 'react';

import Auth from '../../components/Auth/Auth';
import Profile from '../../components/Profile/Profile';

const ProfileContainer = () => {
  const [user, setUser] = useState(null);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const userName = event.target['user-name'].value;
    const password = event.target['password'].value;

    let data = await fetch(`http://w91691o1.beget.tech/api/v1/users/?u=${userName}&p=${password}`).then((response) =>
      response.json()
    );

    if (data.error) {
      alert(data.error);
    } else {
      setUser({ ...data });
    }
  };

  const imageChangeHandler = (event) => {
    const data = new FormData();

    data.append('avatar', event.target.files[0]);
    data.append('id', user.id);

    fetch('http://w91691o1.beget.tech/api/v1/users/', { method: 'POST', body: data })
      .then((response) => response.json())
      .then((data) => setUser((eh) => ({ ...eh, avatar: data.url })));
  };

  return !user ? (
    <Auth onFormSubmit={formSubmitHandler} />
  ) : (
    <Profile onFormSubmit={formSubmitHandler} onImageChange={imageChangeHandler} user={user} />
  );
};

export default ProfileContainer;
