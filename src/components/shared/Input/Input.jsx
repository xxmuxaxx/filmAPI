import React from 'react';
import { Input as AntdInput } from 'antd';

import './Input.scss';

export const Input = ({
  value,
  placeholder,
  defaultValue,
  onChange,
  ...props
}) => {
  return (
    <AntdInput
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      {...props}
    />
  );
};
