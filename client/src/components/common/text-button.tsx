import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

type StyleType = 'black' | 'white';
type ButtonType = 'button' | 'submit' | 'reset';
type Size = 'big' | 'small';

interface ButtonProps {
  type: ButtonType;
  title: string;
  styleType: StyleType;
  size?: Size;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const ButtonBox = styled.button`
  padding: ${({ styleType }) => (styleType === 'black' ? '16px 55px' : '16px 40px')};
  background: ${({ styleType }) => (styleType === 'black' ? 'black' : 'white')};
  font-family: ${({ theme }) => theme?.fontEuljiro};
  font-size: ${({ size }) => (size === 'big' ? '20px' : '16px')};
  border: 1px solid ${({ styleType, theme }) => (styleType === 'black' ? 'black' : theme?.colorTextBeige)};
  color: ${({ styleType, theme }) => (styleType === 'black' ? 'white' : theme?.colorLineDark)};

  &:disabled {
    background: ${({ theme }) => theme?.colorPlaceholder};
    border-color: ${({ theme }) => theme?.colorPlaceholder};
  }

  ${({ theme }) => theme?.mobile} {
    padding: 12px 30px;
    font-size: 14px;
  }
`;

const TextButton: FC<ButtonProps> = ({
  title,
  type,
  styleType,
  size = 'big',
  onClick = () => {},
  disabled = false,
  isLoading = false,
}: ButtonProps) => {
  return (
    <ButtonBox
      type={type}
      onClick={onClick}
      isLoading={isLoading}
      styleType={styleType}
      size={size}
      disabled={disabled ? true : ''}
    >
      {title}
    </ButtonBox>
  );
};

export default TextButton;
