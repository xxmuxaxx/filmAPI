import React, { useState } from 'react';

import { Hamburger, Logo } from '../shared';
import Search from '../Search/Search';
import Menu from '../Menu/Menu';

import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Search />
            <Hamburger isActive={isMenuOpen} onClick={handleMenuToggle} />
          </div>
        </div>
      </header>
      <Menu isActive={isMenuOpen} onClick={handleMenuToggle} />
    </>
  );
};
export default Header;
