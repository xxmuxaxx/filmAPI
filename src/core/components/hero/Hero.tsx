import "./hero.scss";

import { getRandomInt } from "core/helpers/functions";
import { FC, ReactNode, useState } from "react";
import { Link } from "react-router";

import { data } from "./data";

interface IHero {
  link?: string;
  children?: ReactNode;
}

const Hero: FC<IHero> = ({ link, children }) => {
  const [quote] = useState(() => data[getRandomInt(0, data.length)]);
  return (
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
            <div className="hero__text-wrapper">{children || quote}</div>
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
            <div className="hero__text-wrapper">{children || quote}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
