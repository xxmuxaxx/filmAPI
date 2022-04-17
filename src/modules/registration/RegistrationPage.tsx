import './registrationPage.scss';

import React from 'react';

import RegistrationForm from './components/registrationForm/RegistrationForm';

const RegistrationPage = () => {
  return (
    <section className="registration-section">
      <div className="registration-section__container container">
        <div className="registration-section__wrapper">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
