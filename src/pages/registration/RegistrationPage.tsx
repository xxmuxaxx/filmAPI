import "./registrationPage.scss";

import { RegistrationForm } from "features/auth";

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
