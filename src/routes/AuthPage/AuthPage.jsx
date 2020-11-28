import React from 'react';
import {useSelector} from "react-redux";

import Auth from "../../forms/AuthForm/Auth";
import Hero from "../../components/Hero/Hero";

function AuthPage(props) {
    const user = useSelector(({users}) => users.user)

    React.useEffect(() => {
        user && props.history.push('/profile/')
    }, [user, props.history])

    return (
        <>
            <Hero>
                <p className="hero__text">Лезешь в ВОЛКИ,</p>
                <p className="hero__big-text">а хвост <b>собачий</b></p>
            </Hero>
            <Auth/>
        </>
    )

}

export default AuthPage;
