import React from 'react';

import Hero from '../../components/Hero/Hero';
import classes from './IndexPage.module.scss';

const IndexPage = () => (
  <div className={classes.container}>
    <Hero link={'/films/'} />
  </div>
);

export default IndexPage;
