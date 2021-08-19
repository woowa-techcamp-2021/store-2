import styled from 'lib/woowahan-components';

const Input = styled.input`
  border: 0;
  border-bottom: 2px solid ${props => props.theme?.colorGreyMid};
  color: ${props => props.theme?.colorSoftBlack};
  background-color: transparent;
  line-height: 1.5;
  text-indent: 5px;
  margin-bottom: 20px;
  padding: 6px 10px;
  box-sizing: border-box;

  &[type='text'] {
    font-family: ${props => props.theme?.fontHannaAir};
  }

  &::placeholder {
    color: ${props => props.theme?.colorPlaceholder};
    font-family: ${props => props.theme?.fontHannaAir};
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid ${props => props.theme?.colorLineDark};
  }

  ${({ theme }) => theme?.mobile} {
    font-size: 20px;
  }

  ${({ theme }) => theme?.tablet} {
    font-size: 22px;
  }

  ${({ theme }) => theme?.laptop} {
    font-size: 24px;
  }
`;

export default Input;
