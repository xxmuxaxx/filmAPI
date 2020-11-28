import React from 'react';
import {useDispatch} from 'react-redux';

import Profile from '../../components/Profile/Profile';
import {deleteCookie} from '../../utils/functions';
import {fetchUpdateUserAvatar, setUser} from '../../redux/actions/users';

const ProfileContainer = ({user}) => {
    const dispatch = useDispatch();

    const imageChangeHandler = (event) => {
        const formData = new FormData();

        formData.append('avatar', event.target.files[0]);
        formData.append('id', user.id);

        user.avatar && formData.append('url', user.avatar.split('/').reverse()[0]);

        dispatch(fetchUpdateUserAvatar(formData));
    };

    const buttonClickHandler = () => {
        deleteCookie('token');
        dispatch(setUser(null));
    };

    return (
        <Profile
            onImageChange={imageChangeHandler}
            onButtonClick={buttonClickHandler}
            user={user}
        />
    );
};

export default ProfileContainer;
