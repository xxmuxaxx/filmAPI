import React from 'react';

import withAuth from "../../hoc/withAuth/withAuth";
import ProfileContainer from "../../containers/ProfileContainer/ProfileContainer";
import Hero from "../../components/Hero/Hero";

const ProfilePage = (props) => {
    return (
        <>
            <Hero>
                <p className="hero__text">Если волк молчит, то</p>
                <p className="hero__big-text">лучше его не <b>перебивать</b></p>
            </Hero>
            <ProfileContainer {...props} />
        </>
    )
};

export default withAuth(ProfilePage);
