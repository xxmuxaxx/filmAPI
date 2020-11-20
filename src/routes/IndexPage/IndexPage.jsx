import React from 'react';

import Hero from "../../components/Hero/Hero";
import classes from './IndexPage.module.scss';

function IndexPage(props) {
    return (
        <div className={classes.FilmsContainer}>
            <section className="hero">
                <div className="container">
                    <Hero link={'/films/'}>
                        <p className="hero__text">Пора начать смотреть</p>
                        <p className="hero__big-text"><b>МУЖИЦКИЕ</b> ФИЛЬМЫ</p>
                    </Hero>
                </div>
            </section>
        </div>
    );
}

export default IndexPage;
