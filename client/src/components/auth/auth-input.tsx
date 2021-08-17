import styled from 'styled-components';

const AuthInput = styled.input`
  &[type='text'] {
    font-family: ${props => props.theme.fontHannaAir};
  }
  line-height: 1.5;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colorInputLine};
  color: ${({ theme }) => theme.colorSoftBlack};
  text-indent: 5px;
  background-color: transparent;
  &::placeholder {
    color: ${({ theme }) => theme.colorPlaceholder};
  }
  &:not(:first-child) {
    margin-top: 20px;
  }
  ${({ theme }) => theme.mobile} {
    font-size: 20px;
  }
  ${({ theme }) => theme.tablet} {
    font-size: 23px;
  }
  ${({ theme }) => theme.laptop} {
    font-size: 26px;
  }
`;

export default AuthInput;
