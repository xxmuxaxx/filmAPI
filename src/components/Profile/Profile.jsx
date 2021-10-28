import React from 'react';

import API from '../API/API';
import ProfileAside from './ProfileAside/ProfileAside';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({ user, ...props }) => {
  const isAdmin = user.rolePermissions.includes('USER_ADMIN');

  return (
    <section className="profile-section">
      <div className="container">
        <div className="profile-about">
          <h1 className="page-title">Личный кабинет</h1>
          <div className="profile-about__wrapper">
            <ProfileAside
              user={user}
              onImageChange={props.onImageChange}
              onButtonClick={props.onButtonClick}
            />
            <div className="profile-about__content">
              <ProfileInfo user={user} />
              {isAdmin ? <API /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
