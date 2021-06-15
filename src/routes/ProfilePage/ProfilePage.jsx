import React from 'react';

import withAuth from "../../hoc/withAuth/withAuth";
import ProfileContainer from "../../containers/ProfileContainer/ProfileContainer";
import Hero from "../../components/Hero/Hero";

const ProfilePage = (props) => {
    return (
        <>
            <Hero />
            <ProfileContainer {...props} />
        </>
    )
};

export default withAuth(ProfilePage);
