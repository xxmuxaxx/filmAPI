import './logo.scss';

import classNames from 'classnames';
import { env } from 'core/helpers/environment';
import { FC } from 'react';
import { Link } from 'react-router';

type LogoProps = {
  variant?: 'black';
};

const Logo: FC<LogoProps> = ({ variant }) => {
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
