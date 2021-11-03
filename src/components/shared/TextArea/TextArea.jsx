import React from 'react';
import { Input } from 'antd';

import './TextArea.scss';

export const TextArea = ({
  value,
  placeholder,
  defaultValue,
  rows,
  onChange,
}) => {
  return (
    <Input.TextArea
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      rows={rows}
      onChange={onChange}
    />
  );
};
