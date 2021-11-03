import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../../components/Profile/Profile';
import { fetchUpdateUserAvatar, usersActions } from '../../redux/actions/users';
import { deleteCookie } from '../../services/cookieHelper';
import { selectCurrentUser } from '../../redux/selectors/users';
import { useHistory } from 'react-router';
import { env } from '../../services/environment';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser);

  if (!currentUser) {
    history.push(env.auth.baseUrl);
  }

  const imageChangeHandler = (event) => {
    const formData = new FormData();

    formData.append('avatar', event.target.files[0]);
    formData.append('id', currentUser.id);

    currentUser.avatar &&
      formData.append('url', currentUser.avatar.split('/').reverse()[0]);

    dispatch(fetchUpdateUserAvatar(formData));
  };

  const buttonClickHandler = () => {
    dispatch(usersActions.setCurrentUser(null));
    deleteCookie('Authorization');
  };

  return (
    currentUser && (
      <Profile
        onImageChange={imageChangeHandler}
        onButtonClick={buttonClickHandler}
        user={currentUser}
      />
    )
  );
};

export default ProfileContainer;
