import React from "react";
import classes from "./Input.module.scss";

const Input = (props) => {
  return (
    <input
      className={classes.Input}
      placeholder={props.placeholder}
      onChange={props.inputChangeHandler}
    />
  );
};

export default Input;
