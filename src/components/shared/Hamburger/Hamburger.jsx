import React from 'react';
import classNames from 'classnames';

import './Hamburger.scss';

export const Hamburger = ({ isActive, onClick }) => {
  const mainClass = 'hamburger';

  return (
    <div
      className={classNames(mainClass, isActive && `${mainClass}--active`)}
      onClick={onClick}
    >
      <div className="hamburger__item" />
      <div className="hamburger__item" />
      <div className="hamburger__item" />
    </div>
  );
};
