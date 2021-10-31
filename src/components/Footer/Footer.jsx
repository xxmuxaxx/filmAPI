import React from 'react';

import { Logo } from '../shared/';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <Logo variant={'black'} />
          <div className="footer__copyright">
            <span>Разработанно в студии</span>
            <span>Не твоих собачьих дел</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
