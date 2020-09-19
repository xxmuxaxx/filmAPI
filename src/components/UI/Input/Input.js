import React from "react";
import classes from "./Input.module.scss";

const Input = (props) => {
  const type = props.type || "text"

  return (
    <input
      className={classes.Input}
      type={type}
      placeholder={props.placeholder}
      onChange={props.inputChangeHandler}
      value={props.value}
    />
  );
};

export default Input;
