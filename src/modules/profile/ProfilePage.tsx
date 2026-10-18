import { env } from "core/helpers/environment";
import { getCookie } from "core/helpers/cookieHelper";
import Loader from "core/components/loader/Loader";
import {
  selectCurrentUser,
  selectIsFetching,
} from "core/modules/users/selectors/usersSelectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Profile from "./components/profile/Profile";

const ProfilePage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isFetching = useSelector(selectIsFetching);
  if (!currentUser && (isFetching || getCookie("token"))) return <Loader />;
  if (!currentUser) return <Navigate to={env.login.baseUrl} replace />;
  return <Profile />;
};
export default ProfilePage;
