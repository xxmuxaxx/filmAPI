import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './Menu.scss';

// Todo: Поправить на константы
const links = [
  { name: 'Главная', link: '/' },
  { name: 'Фильмы', link: '/films' },
  { name: 'Профиль', link: '/profile' },
];

const Menu = ({ isActive, onClick }) => {
  const mainClass = 'menu';

  return (
    <div className={classNames(mainClass, isActive && `${mainClass}--active`)}>
      <nav className="nav">
        <ul className="nav__list">
          {links.map((link, index) => (
            <li className="nav__item" key={index}>
              <Link to={link.link} className="nav__link" onClick={onClick}>
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
