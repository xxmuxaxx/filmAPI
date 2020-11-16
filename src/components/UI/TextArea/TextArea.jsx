import React from 'react';

import classes from './TextArea.module.scss';

const TextArea = (props) => {
  return (
    <textarea
      className={classes.TextArea}
      rows={props.rows}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default TextArea;
