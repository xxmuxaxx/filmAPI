import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Logo.scss';

export const Logo = ({ variant }) => {
  return (
    <Link
      to="/films"
      className={classNames('logo', variant && `logo--${variant}`)}
    >
      <div className="logo__text-wrapper">
        <span className="logo__big-text">Кавказский</span>
        <span className="logo__text">кинопоиск</span>
      </div>
    </Link>
  );
};
