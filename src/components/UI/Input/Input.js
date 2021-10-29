import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
  const type = props.type || 'text';

  return (
    <input
      className={classes.input}
      type={type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default Input;
