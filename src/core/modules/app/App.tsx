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
    <ConfigProvider locale={ruRU} theme={{
      token: {
        colorPrimary: "#a38a17",
        colorInfo: "#a38a17",
        colorLink: "#a38a17",
        colorLinkHover: "#c2a526",
        colorLinkActive: "#806b10",
        colorText: "#080808",
        colorTextSecondary: "#62666b",
        colorBgLayout: "#f3f5f6",
        colorBorder: "#e1e3e5",
        fontFamily: "Roboto, sans-serif",
        borderRadius: 4,
        controlHeight: 44,
      },
      components: {
        Pagination: {
          itemActiveBg: "#a38a17",
          itemActiveColor: "#ffffff",
          itemActiveColorHover: "#ffffff",
          itemSize: 36,
        },
      },
    }}>
      <AntApp>
        <Suspense fallback={<Loader />}>
          <AppRouting />
        </Suspense>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
