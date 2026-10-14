import "./loginPage.scss";

import { RootState } from "core/coreReducers";
import { env } from "core/helpers/environment";
import { selectCurrentUser } from "core/modules/users/selectors/usersSelectors";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Login from "./components/login/Login";

const LoginPage = () => {
  const currentUser = useSelector<RootState>(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate(env.profile.baseUrl);
  }, [currentUser, navigate]);

  return (
    <section className="login-section">
      <div className="login-section__container container">
        <div className="login-section__wrapper">
          <Login />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
