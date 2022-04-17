import 'antd/dist/antd.css';
import 'fontsource-roboto';
import './App.scss';

import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import Loader from 'core/components/loader/Loader';
import { getCookie } from 'core/helpers/cookieHelper';
import { fetchCurrentUser } from 'core/modules/users/actions/usersActions';
import AppRouting from 'core/routing/AppRouting';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  // Проверяем наличие токена в куках. И, если есть - получаем пользователя
  useEffect(() => {
    if (getCookie('token')) dispatch(fetchCurrentUser());
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <ConfigProvider locale={ruRU}>
        <AppRouting />
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
