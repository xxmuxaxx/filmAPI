import "antd/dist/antd.min.css";
import "fontsource-roboto";
import "./App.scss";

import { ConfigProvider } from "antd";
import ruRU from "antd/lib/locale/ru_RU";
import Loader from "core/components/loader/Loader";
import { getCookie } from "core/helpers/cookieHelper";
import AppRouting from "core/routing/AppRouting";
import { Suspense, useEffect } from "react";
import { useActions } from "core/hooks/useActions";

const App = () => {
  const { fetchCurrentUser } = useActions();

  // Проверяем наличие токена в куках. И, если есть - получаем пользователя
  useEffect(() => {
    if (getCookie("token")) fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <Suspense fallback={<Loader />}>
      <ConfigProvider locale={ruRU}>
        <AppRouting />
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
