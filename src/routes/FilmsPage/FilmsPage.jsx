import React from 'react';

import Hero from "../../components/Hero/Hero";
import FilmsContainer from "../../containers/FilmsContainer/FilmsContainer";

const FilmsPage = (props) => {
    return (
        <>
            <Hero>
                <p className="hero__text">Достал нож - режь,</p>
                <p className="hero__big-text">достал <b>бутерброд</b> - ешь</p>
            </Hero>
            <FilmsContainer {...props} />
        </>
    )
};

export default FilmsPage;