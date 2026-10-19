import { env } from "shared/config";
import { Loader } from "shared/ui/loader";
import { useCurrentUser, useSessionStore } from "entities/user";
import { Navigate } from "react-router";
import Profile from "./components/profile/Profile";

const ProfilePage = () => {
  const currentUser = useCurrentUser().data;
  const phase = useSessionStore((state) => state.phase);
  if (!currentUser && phase === "restoring") {
    return <Loader />;
  }
  if (!currentUser) {
    return <Navigate to={env.login.baseUrl} replace />;
  }
  return <Profile />;
};
export default ProfilePage;
