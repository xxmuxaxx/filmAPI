import PageState from "core/components/pageState/PageState";
import { env } from "core/helpers/environment";
import { FC, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Layout from "../modules/app/components/layout/Layout";

const MoviePage = lazy(() => import("modules/movie/MoviePage"));
const MoviesPage = lazy(() => import("modules/movies/MoviesPage"));
const LoginPage = lazy(() => import("modules/login/LoginPage"));
const RegistrationPage = lazy(
  () => import("modules/registration/RegistrationPage")
);
const ProfilePage = lazy(() => import("modules/profile/ProfilePage"));

const AppRouting: FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={env.film.baseUrl} element={<MoviePage />} />
          <Route path={env.films.baseUrl} element={<MoviesPage />} />
          <Route path={env.login.baseUrl} element={<LoginPage />} />
          <Route
            path={env.registration.baseUrl}
            element={<RegistrationPage />}
          />
          <Route path={env.profile.baseUrl} element={<ProfilePage />} />
          <Route
            path={env.index.baseUrl}
            element={<Navigate to={env.films.baseUrl} replace />}
          />
          <Route path="*" element={<PageState />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouting;
