import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const ProfileAside = ({ user, onButtonClick }) => {
  const image = user.avatar
    ? user.avatar
    : 'https://www.tclilibrary.com/admin2/dist/use.png';

  return (
    <div className="profile-about__aside">
      <div className="profile-info">
        <div className="profile-info__image-wrapper">
          <label>
            <input name="avatar" type="file" style={{ display: 'none' }} />
            <img className="profile-info__image" src={image} alt={user.name} />
          </label>
        </div>
        <div className="profile-info__name">{user.username}</div>
        <Box className="profile-info__logout">
          <Button variant="contained" onClick={onButtonClick}>
            Выйти
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ProfileAside;
