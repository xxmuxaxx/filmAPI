import React, { useState } from 'react';

import Logo from '../UI/Logo/Logo';
import Search from '../Nav/Search/Search';
import Menu from '../Nav/Menu/Menu';
import Hamburger from '../Nav/Hamburger/Hamburger';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Search />
            <Hamburger
              isMenuOpen={isMenuOpen}
              toggleMenuHandler={toggleMenuHandler}
            />
          </div>
        </div>
      </header>
      <Menu isMenuOpen={isMenuOpen} toggleMenuHandler={toggleMenuHandler} />
    </>
  );
};
export default Header;
