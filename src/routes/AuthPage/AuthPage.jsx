import React from 'react';
import {useSelector} from "react-redux";

import Auth from "../../forms/Auth/Auth";
import Hero from "../../components/Hero/Hero";
import Registration from "../../forms/Registration/Registration";
import classes from './AuthPage.module.scss'

function AuthPage(props) {
    const [auth, setAuth] = React.useState(true)
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
            {auth && <div>
                <div className="container">
                    <p className={classes.text}>Нет аккаунта? <b onClick={() => setAuth(!auth)}>Зарегестрироваться</b>
                    </p>
                </div>
            </div>}
            {auth ? <Auth/> : <Registration/>}
        </>
    )

}

export default AuthPage;
