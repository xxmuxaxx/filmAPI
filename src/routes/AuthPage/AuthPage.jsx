import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Auth from "../../forms/AuthForm/Auth";
import Hero from "../../components/Hero/Hero";

import {fetchUser} from "../../redux/actions/users";

function AuthPage(props) {
    const dispatch = useDispatch()
    const user = useSelector(({users}) => users.user)

    React.useEffect(() => {
        user && props.history.push('/profile/')
    }, [user, props.history])

    const formSubmitHandler = ({username, password}) => {
        dispatch(fetchUser({username, password}));
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
