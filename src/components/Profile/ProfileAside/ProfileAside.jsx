import React from "react";

const ProfileAside = ({ user, onImageChange, onButtonClick }) => {
    const image = user.avatar ? user.avatar : 'https://www.tclilibrary.com/admin2/dist/use.png';

    return (
        <div className="profile-about__aside">
            <div className="profile-info">
                <div className="profile-info__image-wrapper">
                    <label>
                        <input name="avatar" type="file" style={{ display: 'none' }} accept=".jpg, .jpeg, .png"
                               onChange={onImageChange}/>
                        <img className="profile-info__image" src={image} alt={user.name} />
                    </label>
                </div>
                <button className="profile-info__logout" onClick={onButtonClick}>
                    Выйти
                </button>
                <div className="profile-info__name">{user.name}</div>
            </div>
        </div>
    )
}

export default ProfileAside