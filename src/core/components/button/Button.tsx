import './button.scss';

import React, { FC } from 'react';

type ButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button onClick={onClick} className="button" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
