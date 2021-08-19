import React, { FC, ChangeEvent } from 'react';
import woowahan from 'lib/woowahan-components';

interface CheckBoxProps {
  id: string;
  text: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Label = woowahan.label`
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  font-family: ${props => props.theme?.fontHannaAir};
  color: ${props => props.theme?.colorSoftBlack};

  &:hover .checkmark {
    background-color: ${props => props.theme?.colorPointBeigeLight};
  }
`;

const CheckBoxInput = woowahan.input`
  opacity: 0;
  height: 0;
  width: 0;

  &:checked ~ .checkmark {
    background-color: ${props => props.theme?.colorLine};
  }

  &:checked ~ .checkmark:after {
    display: block;
  }
`;

const CheckMark = woowahan.span`
  height: 14px;
  width: 14px;
  background-color: ${props => props.theme?.colorOffWhite};
  margin-left: 5px;
  margin-right: 10px;

  &:after {
    content: "";
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

const CheckBox: FC<CheckBoxProps> = ({ id, text, onChange }) => {
  return (
    <Label htmlFor={id}>
      <CheckBoxInput type="checkbox" id={id} onChange={onChange} />
      <CheckMark className="checkmark" />
      {text}
    </Label>
  );
};

export default CheckBox;
