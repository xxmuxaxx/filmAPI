import "./button.scss";

import { FC, ReactNode } from "react";

type ButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button onClick={onClick} className="button" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
