import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <NavLink to="/" className="logo">
            <div className="logo__text-wrapper">
              <p className="logo__big-text">Кавказский</p>
              <p className="logo__text">кинопоиск</p>
            </div>
          </NavLink>
          <div className="copyright">
            <p className="copyright__top">Разработанно в студии</p>
            <p className="copyright__bottom">Не твоих собачьих дел</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
