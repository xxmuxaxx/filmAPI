import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Search from "../Nav/Search/Search";
import classNames from "classnames";

export default function Header(props) {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  function hamburgerClickHandler() {
    setHamburgerIsOpen(!hamburgerIsOpen);
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <NavLink to="/" className="logo">
              <svg
                className="logo__svg"
                viewBox="0 0 80 67"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M65.356 38.7048H61.3287V33.9083C66.8456 30.8006 70.5823 24.8877 70.5823 18.115C70.5823 8.1263 62.4598 0 52.4757 0C44.4803 0 37.6834 5.21366 35.2912 12.4196C32.8987 5.21366 26.102 0.000222284 18.1066 0.000222284C8.12253 0.000222284 0 8.12652 0 18.115C0 24.8877 3.7367 30.8004 9.25339 33.9081V67H61.3285V59.0652H65.9613L80 66.6146V31.1963L65.356 38.7048ZM24.4999 27.9578L18.1066 24.1024L11.7134 27.9578L13.4027 20.6834L7.76196 15.7915L15.1994 15.151L18.1066 8.27242L21.0137 15.151L28.4511 15.7915L22.8104 20.6834L24.4999 27.9578ZM31.0449 30.7702C32.9476 28.8235 34.4144 26.4513 35.2912 23.8104C36.1679 26.451 37.6347 28.8235 39.5374 30.7702H31.0449ZM57.1796 20.6834L58.8689 27.9578L52.4757 24.1024L46.0825 27.9578L47.7717 20.6834L42.131 15.7915L49.5684 15.151L52.4755 8.27242L55.3825 15.151L62.8199 15.7915L57.1796 20.6834Z" />
              </svg>
              <div className="logo__text-wrapper">
                <p className="logo__big-text">Кавказский</p>
                <p className="logo__text">кинопоиск</p>
              </div>
            </NavLink>
            <Search
              linkClickHandler={props.linkClickHandler}
              inputChangeHandler={props.inputChangeHandler}
              placeholder={props.placeholder}
              dropdown={props.dropdown}
              value={props.value}
            />
            <div
              onClick={hamburgerClickHandler}
              className={classNames({
                hamburger: true,
                "hamburger--active": hamburgerIsOpen,
              })}
            >
              <div className="hamburger__item"></div>
              <div className="hamburger__item"></div>
              <div className="hamburger__item"></div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={classNames({
          menu: true,
          "menu--active": hamburgerIsOpen,
        })}
      >
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Главная
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Главная
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/" className="nav__link">
                Главная
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
