import './hero.scss';

import { getRandomInt } from 'core/helpers/functions';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { data } from './data';

interface IHero {
  link?: string;
}

const Hero: FC<IHero> = ({ link, children }) => (
  <section className="hero">
    <div className="container">
      {link ? (
        <Link to={link} className="hero__wrapper">
          <div className="hero__image-wrapper">
            <img
              className="hero__image"
              src="/images/statham.png"
              alt="Стетхем"
            />
          </div>
          <div className="hero__text-wrapper">
            {children || data[getRandomInt(0, data.length)]}
          </div>
        </Link>
      ) : (
        <div className="hero__wrapper">
          <div className="hero__image-wrapper">
            <img
              className="hero__image"
              src="/images/statham.png"
              alt="Стетхем"
            />
          </div>
          <div className="hero__text-wrapper">
            {children || data[getRandomInt(0, data.length)]}
          </div>
        </div>
      )}
    </div>
  </section>
);

export default Hero;
