import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

interface RadioButtonProps {
  id: string;
  text: string;
  value: string;
  checked: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;

  input[type='radio'] {
    min-width: 13px;
    margin-right: 8px;
  }
`;

const RadioButton: FC<RadioButtonProps> = ({ id, text, onChange, checked }) => {
  return (
    <Label htmlFor={id}>
      <input type="radio" id={id} value={id} checked={checked === id} onChange={onChange} />
      {text}
    </Label>
  );
};

export default RadioButton;
