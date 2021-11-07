import React from 'react';
import './RegistrationPage.scss';
import { Registration } from '../../components/Forms';

export const RegistrationPage = () => {
  return (
    <section className="registration-section">
      <div className="registration-section__container container">
        <div className="registration-section__wrapper">
          <Registration />
        </div>
      </div>
    </section>
  );
};
