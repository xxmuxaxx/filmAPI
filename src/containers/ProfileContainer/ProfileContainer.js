import React, { useState } from 'react';

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

  return <Profile onFormSubmit={formSubmitHandler} user={user} />;
};

export default ProfileContainer;
