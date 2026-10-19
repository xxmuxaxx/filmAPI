import "./header.scss";

import { UserOutlined } from "@ant-design/icons";
import { Logo } from "shared/ui/logo";
import { env } from "shared/config";
import { FC } from "react";
import { Link } from "react-router";

import { Search } from "features/search-movies";

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
