import { NotFoundPage } from "pages/not-found";
import { env } from "shared/config";
import { FC, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import Layout from "../layout/Layout";

const MoviePage = lazy(() => import("pages/movie"));
const MoviesPage = lazy(() => import("pages/movies"));
const LoginPage = lazy(() => import("pages/login"));
const RegistrationPage = lazy(() => import("pages/registration"));
const ProfilePage = lazy(() => import("pages/profile"));

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouting;
