import React from 'react';
import classNames from 'classnames';

const Hamburger = ({ isMenuOpen, toggleMenuHandler }) => {
  return (
    <div
      onClick={toggleMenuHandler}
      className={classNames({
        hamburger: true,
        'hamburger--active': isMenuOpen,
      })}
    >
      <div className="hamburger__item"></div>
      <div className="hamburger__item"></div>
      <div className="hamburger__item"></div>
    </div>
  );
};

export default Hamburger;
