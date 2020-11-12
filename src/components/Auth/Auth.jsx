import React from 'react';
import { Button, TextField } from '@material-ui/core';

const Auth = ({ onFormSubmit }) => {
  return (
    <section className="auth-section">
      <div className="container">
        <form className="auth-form" onSubmit={onFormSubmit}>
          <h2>Авторизация</h2>

          <TextField className="auth-form__input" name="user-name" label="Ваш логин" autoComplete="username" />
          <TextField
            className="auth-form__input"
            name="password"
            type="password"
            label="Ваш пароль"
            autoComplete={'current-password'}
          />
          <Button type="submit" color="primary" variant="contained">
            Войти
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
