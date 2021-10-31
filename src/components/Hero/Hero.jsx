import React from 'react';
import { Link } from 'react-router-dom';

import heroBackground from '../../img/hero-img.png';
import { getRandomInt } from '../../utils/functions';

import { data } from './data';
import './Hero.scss';

const Hero = ({ link, ...props }) => (
  <section className="hero">
    <div className="container">
      {link ? (
        <Link to={link} className="hero__wrapper">
          <div className="hero__image-wrapper">
            <img className="hero__image" src={heroBackground} alt="Стетхем" />
          </div>
          <div className="hero__text-wrapper">
            {props.children
              ? props.children
              : data[getRandomInt(0, data.length)]}
          </div>
        </Link>
      ) : (
        <div className="hero__wrapper">
          <div className="hero__image-wrapper">
            <img className="hero__image" src={heroBackground} alt="Стетхем" />
          </div>
          <div className="hero__text-wrapper">
            {props.children
              ? props.children
              : data[getRandomInt(0, data.length)]}
          </div>
        </div>
      )}
    </div>
  </section>
);

export default Hero;
