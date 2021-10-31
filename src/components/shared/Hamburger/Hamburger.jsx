import React from 'react';
import classNames from 'classnames';

import './Hamburger.scss';

export const Hamburger = ({ isActive, onClick }) => {
  const mainClass = 'hamburger';

  return (
    <div
      onClick={onClick}
      className={classNames(mainClass, isActive && `${mainClass}--active`)}
    >
      <div className="hamburger__item" />
      <div className="hamburger__item" />
      <div className="hamburger__item" />
    </div>
  );
};
