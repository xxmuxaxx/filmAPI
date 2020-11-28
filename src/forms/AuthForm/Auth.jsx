import React from 'react';
import {Button} from '@material-ui/core';
import {Field, reduxForm} from 'redux-form'
import {TextField} from '@jcoreio/redux-form-material-ui'

let AuthForm = ({handleSubmit, pristine, submitting}) => {
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Авторизация</h2>
            <Field className="auth-form__input" name="username" type="text" label="Ваш логин" autoComplete="username"
                   component={TextField} required/>
            <Field className="auth-form__input" name="password" type="password" label="Ваш пароль"
                   autoComplete={'current-password'} component={TextField} required/>
            <Button color="primary" type="submit" variant="contained" disabled={pristine || submitting}>Войти</Button>
        </form>
    )
}

AuthForm = reduxForm({form: 'auth'})(AuthForm)

const Auth = ({formSubmitHandler}) => (
    <section className="auth-section">
        <div className="container">
            <AuthForm onSubmit={formSubmitHandler}/>
        </div>
    </section>
);

export default Auth;
