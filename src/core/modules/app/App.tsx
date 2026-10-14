import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.scss";

import { App as AntApp, ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
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
    <ConfigProvider locale={ruRU}>
      <AntApp>
        <Suspense fallback={<Loader />}>
          <AppRouting />
        </Suspense>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
