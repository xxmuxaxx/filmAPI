import React from 'react';

import API from '../API/API';

const Profile = ({ user, onImageChange }) => {
  const image = user.avatar ? user.avatar : 'https://www.tclilibrary.com/admin2/dist/use.png';
  return (
    <section className="profile-section">
      <div className="container">
        <div className="profile-about">
          <h1 className="page-title">Личный кабинет</h1>
          <div className="profile-about__wrapper">
            <div className="profile-about__aside">
              <div className="profile-info">
                <div className="profile-info__image-wrapper">
                  <label>
                    <input
                      name="avatar"
                      type="file"
                      style={{ display: 'none' }}
                      accept=".jpg, .jpeg, .png"
                      onChange={onImageChange}
                    />
                    <img className="profile-info__image" src={image} alt={user.name} />
                  </label>
                </div>
                <div className="profile-info__name">{user.name}</div>
              </div>
            </div>
            <div className="profile-about__content">{user.isAdmin ? <API /> : null}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
