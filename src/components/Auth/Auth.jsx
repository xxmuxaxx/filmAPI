import React from 'react';

import Input from '../UI/Input/Input';

const Auth = ({ onFormSubmit }) => {
  return (
    <section className="auth-section">
      <div className="container">
        <form className="auth-form" onSubmit={onFormSubmit}>
          <h2>Авторизация</h2>
          <Input name="user-name" placeholder="Ваш логин" autoComplete="username" />
          <Input name="password" type="password" placeholder="Ваш пароль" autoComplete={'current-password'} />
          <Input type="submit" />
        </form>
      </div>
    </section>
  );
};

export default Auth;
