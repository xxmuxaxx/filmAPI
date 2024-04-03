import Hero from "core/components/hero/Hero";
import { RootState } from "core/coreReducers";
import { env } from "core/helpers/environment";
import { selectCurrentUser } from "core/modules/users/selectors/usersSelectors";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Profile from "./components/profile/Profile";

const ProfilePage = () => {
  const history = useHistory();
  const currentUser = useSelector<RootState>(selectCurrentUser);

  React.useEffect(() => {
    !currentUser && history.push(env.login.baseUrl);
  }, [currentUser, history]);

  return (
    <>
      <Hero />
      <Profile />
    </>
  );
};

export default ProfilePage;
