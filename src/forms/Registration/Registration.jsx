import React from 'react';
import {useDispatch} from "react-redux";
import {Field, reduxForm} from "redux-form"
import {Button} from "@material-ui/core";
import {TextField} from "@jcoreio/redux-form-material-ui"

import authApi from "../../api/authApi";
import usersApi from "../../api/usersApi";
import {deleteCookie, setCookie} from "../../utils/functions";
import {fetchCurrentUser} from "../../redux/actions/users";
import styles from "../EditFilm/EditFilm.module.css";

const validate = values => {
    const errors = {}

    if (!values.username) {
        errors.username = 'Обязательное поле';
    }

    if (!values.password) {
        errors.password = 'Обязательное поле';
    }

    if (values.password && values.password.length < 6) {
        errors.password = 'Пароль должен быть длиннее 6 символов';
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Пароли должны совпадать';
    }

    return errors
}

const Input = (props) => <Field className="auth-form__input" component={TextField} {...props} />

let RegistrationForm = ({handleSubmit, error, valid}) => {
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <Input name="username" label="Ваш логин" autoComplete="username"/>
            <Input name="password" type="password" label="Ваш пароль" autoComplete="new-password"/>
            <Input name="confirmPassword" type="password" label="Повторите пароль" autoComplete="new-password"/>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <Button color="primary" type="submit" variant="contained" disabled={!valid}>Регистрация</Button>
        </form>
    )
}

RegistrationForm = reduxForm({form: 'registration', validate})(RegistrationForm)

const Registration = () => {
    const dispatch = useDispatch()

    const formSubmitHandler = async ({username, password}) => {
        const data = {
            username: username,
            password: password,
            name: null,
            lastName: null,
            middleName: null,
            gender: null,
            email: null,
            theme: null
        }

        const response = await usersApi.registerUser(data)

        if (response.status === 201) {
            const response = await authApi.login({username, password})

            if (response.status === 200) {
                setCookie('token', response.data.token);
                dispatch(fetchCurrentUser(response.data.token))
            } else {
                deleteCookie('token')
            }
        }
    };

    return (
        <section className="auth-section">
            <div className="container">
                <RegistrationForm onSubmit={formSubmitHandler}/>
            </div>
        </section>
    )
}


export default Registration;
