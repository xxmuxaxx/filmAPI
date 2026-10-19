import "./loginPage.scss";

import { env } from "shared/config";
import { useCurrentUser } from "entities/user";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { LoginForm } from "features/auth";

const LoginPage = () => {
  const currentUser = useCurrentUser().data;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(env.profile.baseUrl);
    }
  }, [currentUser, navigate]);

  return (
    <section className="login-section">
      <div className="login-section__container container">
        <div className="login-section__wrapper">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
