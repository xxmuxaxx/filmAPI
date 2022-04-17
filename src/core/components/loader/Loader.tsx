import './loader.scss';

import React, { useEffect, VFC } from 'react';

const Loader: VFC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '17px';

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  });

  return (
    <div className="wrapper">
      <div className="loader" />
    </div>
  );
};
export default Loader;
