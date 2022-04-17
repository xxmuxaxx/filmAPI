import './header.scss';

import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import { Button } from 'antd';
import Logo from 'core/components/logo/Logo';
import { env } from 'core/helpers/environment';
import React, { VFC } from 'react';
import { Link } from 'react-router-dom';

import Search from '../search/Search';

const Header: VFC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <Logo />
          </div>
          <div className="header__search">
            <Search />
          </div>
          <div className="header__profile">
            <Link to={env.profile.baseUrl}>
              <Button type="link">
                <UserOutlined />
                Профиль
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
