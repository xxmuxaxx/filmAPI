import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const links = [
  { name: 'Главная', link: '/' },
  { name: 'Фильмы', link: '/films' },
  { name: 'Профиль', link: '/profile' },
];

const Menu = ({ isMenuOpen, toggleMenuHandler }) => {
  return (
    <div className={classNames({ menu: true, 'menu--active': isMenuOpen })}>
      <nav className="nav">
        <ul className="nav__list">
          {links.map((link, index) => (
            <li className="nav__item" key={index}>
              <Link to={link.link} className="nav__link" onClick={toggleMenuHandler}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
