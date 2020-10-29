import React from "react";
import classes from "./Input.module.scss";

const Input = (props) => {
  const type = props.type || "text";

  return (
    <input
      className={classes.Input}
      type={type}
      value={props.inputValue}
      placeholder={props.inputPlaceholder}
      onChange={props.inputChangeHandler}
    />
  );
};

export default Input;
