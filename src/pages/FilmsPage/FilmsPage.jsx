import React from 'react';
import Hero from '../../components/Hero/Hero';
import FilmsContainer from '../../containers/FilmsContainer/FilmsContainer';

export const FilmsPage = (props) => {
  return (
    <>
      <Hero />
      <FilmsContainer {...props} />
    </>
  );
};