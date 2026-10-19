import "app/api/session";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "app/providers/queryClient";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles/App.scss";

import { App as AntApp, ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import { Loader } from "shared/ui/loader";
import AppRouting from "./router/AppRouting";
import { Suspense } from "react";
import SessionBootstrap from "app/providers/SessionBootstrap";

import { filmTheme } from "./styles/theme";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ruRU} theme={filmTheme}>
        <AntApp>
          <SessionBootstrap />
          <Suspense fallback={<Loader />}>
            <AppRouting />
          </Suspense>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
