import React from 'react';

import {fetchUser} from "../../redux/actions/users";
import Auth from "../../components/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import Hero from "../../components/Hero/Hero";

function AuthPage(props) {
    const dispatch = useDispatch()
    const user = useSelector(({users}) => users.user)

    React.useEffect(() => {
        user && props.history.push('/profile/')
    }, [user, props.history])

    const formSubmitHandler = ({login, password}) => {
        dispatch(fetchUser({login, password}));
    };

    return (
        <>
            <Hero>
                <p className="hero__text">Лезешь в ВОЛКИ,</p>
                <p className="hero__big-text">а хвост <b>собачий</b></p>
            </Hero>
            <Auth formSubmitHandler={formSubmitHandler}/>
        </>
    )

}

export default AuthPage;
