import React from 'react';

import Hero from '../../core/components/hero/Hero';
import classes from './indexPage.module.scss';

export const IndexPage = () => (
  <div className={classes.container}>
    <Hero link={'/films/'} />
  </div>
);
