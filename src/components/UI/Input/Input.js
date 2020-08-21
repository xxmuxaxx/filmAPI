import React from "react";
import classes from "./Input.module.scss";

const Input = (props) => {
  return (
    <input
      className={classes.Input}
      type={props.type}
      placeholder={props.placeholder}
      onChange={(e) => props.inputChangeHundler(e)}
    />
  );
};

export default Input;
