import React from 'react';
import { Button } from 'antd';
import { Logo } from '../shared';
import { Search } from '../Search';
import './Header.scss';
import { Link } from 'react-router-dom';
import { env } from '../../services/environment';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';

export const Header = () => {
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
