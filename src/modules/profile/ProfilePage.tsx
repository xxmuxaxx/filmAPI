import Hero from "core/components/hero/Hero";
import { env } from "core/helpers/environment";
import { selectCurrentUser } from "core/modules/users/selectors/usersSelectors";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Profile from "./components/profile/Profile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  React.useEffect(() => {
    if (!currentUser) navigate(env.login.baseUrl);
  }, [currentUser, navigate]);

  return (
    <>
      <Hero />
      <Profile />
    </>
  );
};

export default ProfilePage;
