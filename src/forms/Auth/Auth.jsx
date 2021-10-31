import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm, stopSubmit } from 'redux-form';
import { Button } from '@material-ui/core';
import { TextField } from '@jcoreio/redux-form-material-ui';

import { fetchCurrentUser } from '../../redux/actions/users';
import styles from '../EditFilm/EditFilm.module.css';
import authApi from '../../api/authApi';
import { deleteCookie, setCookie } from '../../utils/functions';

import './Auth.scss';

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Обязательное поле';
  }

  if (!values.password) {
    errors.password = 'Обязательное поле';
  }

  return errors;
};

const Input = (props) => (
  <Field className="auth-form__input" component={TextField} {...props} />
);

let AuthForm = ({ handleSubmit, error, valid }) => {
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Авторизация</h2>
      <Input name="username" label="Ваш логин" autoComplete="username" />
      <Input
        name="password"
        type="password"
        label="Ваш пароль"
        autoComplete="current-password"
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
      <Button
        color="primary"
        type="submit"
        variant="contained"
        disabled={!valid}
      >
        Войти
      </Button>
    </form>
  );
};

AuthForm = reduxForm({ form: 'auth', validate })(AuthForm);

const Auth = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = (formData) => {
    authApi
      .login(formData)
      .then((response) => {
        if (response.status === 200) {
          setCookie('token', response.data.token);
          dispatch(fetchCurrentUser(response.data.token));
        } else {
          deleteCookie('token');
        }
      })
      .catch(() => {
        deleteCookie('token');
        dispatch(stopSubmit('auth', { _error: 'Неверный логин или пароль' }));
      });
  };

  return (
    <section className="auth-section">
      <div className="container">
        <AuthForm onSubmit={formSubmitHandler} />
      </div>
    </section>
  );
};

export default Auth;
