import './header.scss';

import { UserOutlined } from '@ant-design/icons';
import Logo from 'core/components/logo/Logo';
import { env } from 'core/helpers/environment';
import { FC } from 'react';
import { Link } from 'react-router';

import Search from '../search/Search';

const Header: FC = () => {
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
            <Link className="header__profile-link" to={env.profile.baseUrl}>
              <UserOutlined />
              Профиль
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
