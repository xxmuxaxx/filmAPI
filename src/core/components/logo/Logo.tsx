import './logo.scss';

import classNames from 'classnames';
import { env } from 'core/helpers/environment';
import React, { VFC } from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  variant?: 'black';
};

const Logo: VFC<LogoProps> = ({ variant }) => {
  return (
    <Link
      to={env.films.baseUrl}
      className={classNames('logo', variant && `logo--${variant}`)}
    >
      <div className="logo__text-wrapper">
        <span className="logo__big-text">Кавказский</span>
        <span className="logo__text">кинопоиск</span>
      </div>
    </Link>
  );
};

export default Logo;
