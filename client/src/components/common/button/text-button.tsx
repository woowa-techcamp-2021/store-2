import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import { CircleLoader } from 'components';

type StyleType = 'black' | 'white';
type ButtonType = 'button' | 'submit' | 'reset';
type Size = 'big' | 'small';

interface TextButtonProps {
  type: ButtonType;
  title: string;
  styleType: StyleType;
  size?: Size;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = styled.button`
  padding: ${({ styleType }) => (styleType === 'black' ? '16px 55px' : '16px 40px')};
  background: ${({ styleType }) => (styleType === 'black' ? 'black' : 'white')};
  font-family: ${({ theme }) => theme?.fontEuljiro};
  font-size: ${({ size }) => (size === 'big' ? '20px' : '16px')};
  border: 1px solid ${({ styleType, theme }) => (styleType === 'black' ? 'black' : theme?.colorTextBeige)};
  color: ${({ styleType, theme }) => (styleType === 'black' ? 'white' : theme?.colorLineDark)};
  width: fit-content;

  &:disabled {
    background: ${({ theme }) => theme?.colorPlaceholder};
    border-color: ${({ theme }) => theme?.colorPlaceholder};
  }

  ${({ theme }) => theme?.mobile} {
    padding: 12px 30px;
    font-size: 14px;
  }
`;

const TextButton: FC<TextButtonProps> = ({
  title,
  type,
  styleType,
  size = 'big',
  onClick = () => {},
  disabled = false,
  isLoading = false,
}: TextButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      styleType={styleType}
      size={size}
      disabled={disabled || isLoading ? true : ''}
    >
      {isLoading ? <CircleLoader size="20px" color="grey" /> : title}
    </Button>
  );
};

export default TextButton;
