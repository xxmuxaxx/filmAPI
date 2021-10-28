import React from 'react';
import { Link } from 'react-router-dom';
import heroBackground from '../../img/hero-img.png';
import { getRandomInt } from '../../utils/functions';

const arr = [
  <>
    <p className="hero__text">Достал нож - режь,</p>
    <p className="hero__big-text">
      достал бутерброд - <b>ешь</b>
    </p>
  </>,
  <>
    <p className="hero__text">Пора начать смотреть</p>
    <p className="hero__big-text">
      <b>МУЖИЦКИЕ</b> ФИЛЬМЫ
    </p>
  </>,
  <>
    <p className="hero__text">Если волк молчит, то</p>
    <p className="hero__big-text">
      лучше его не <b>перебивать</b>
    </p>
  </>,
  <>
    <p className="hero__text">Лезешь в ВОЛКИ,</p>
    <p className="hero__big-text">
      а хвост <b>собачий</b>
    </p>
  </>,
  <>
    <p className="hero__text">Не воровал металл</p>
    <p className="hero__big-text">
      <b>Жизни</b> не видал
    </p>
  </>,
  <>
    <p className="hero__text">Огурец и молочко</p>
    <p className="hero__big-text">
      <b>Разорвут</b> твое очко
    </p>
  </>,
  <>
    <p className="hero__text">Не круто пить, не круто врать</p>
    <p className="hero__big-text">
      А круто маме <b>помогать</b>
    </p>
  </>,
  <>
    <p className="hero__text">На первом месте - это мать</p>
    <p className="hero__big-text">
      А после <b>Camry 3,5</b>
    </p>
  </>,
];

const Hero = ({ link, ...props }) => (
  <section className="hero">
    <div className="container">
      {link ? (
        <Link to={link} className="hero__wrapper">
          <div className="hero__image-wrapper">
            <img className="hero__image" src={heroBackground} alt="Стетхем" />
          </div>
          <div className="hero__text-wrapper">
            {props.children ? props.children : arr[getRandomInt(0, arr.length)]}
          </div>
        </Link>
      ) : (
        <div className="hero__wrapper">
          <div className="hero__image-wrapper">
            <img className="hero__image" src={heroBackground} alt="Стетхем" />
          </div>
          <div className="hero__text-wrapper">
            {props.children ? props.children : arr[getRandomInt(0, arr.length)]}
          </div>
        </div>
      )}
    </div>
  </section>
);

export default Hero;
