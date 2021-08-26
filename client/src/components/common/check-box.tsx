import React, { FC, ChangeEvent } from 'react';
import styled from 'lib/woowahan-components';

interface CheckBoxProps {
  id: string;
  text: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  check?: boolean;
}

const Label = styled.label`
  cursor: pointer;
  position: relative;
  display: flex;
  font-family: ${props => props.theme?.fontHannaAir};
  color: ${props => props.theme?.colorSoftBlack};

  &:hover .checkmark {
    background-color: ${props => props.theme?.colorPointBeigeLight};
  }

  input[type='checkbox'] {
    opacity: 0;
    height: 0;
    width: 0;

    &:checked ~ .checkmark {
      background-color: ${props => props.theme?.colorLine};
    }

    &:checked ~ .checkmark:after {
      display: block;
    }
  }
`;

const CheckMark = styled.div`
  height: 14px;
  width: 14px;
  background-color: ${props => props.theme?.colorOffWhite};
  margin-left: 5px;
  margin-right: 10px;

  &:after {
    content: '';
    display: none;
    position: absolute;
    left: 9px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const CheckBox: FC<CheckBoxProps> = ({ id, text, onChange, check }) => {
  return (
    <Label htmlFor={id}>
      <input type="checkbox" id={id} checked={check} onChange={onChange} />
      <CheckMark className="checkmark" />
      {text}
    </Label>
  );
};

export default CheckBox;
