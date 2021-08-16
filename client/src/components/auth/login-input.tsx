import styled from 'styled-components';

const LoginInput = styled.input`
  font-family: ${props => props.theme.fontHannaAir};
  line-height: 1.5;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colorInputLine};
  color: ${({ theme }) => theme.colorSoftBlack};
  text-indent: 5px;
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
    font-size: 26px;
  }
  ${({ theme }) => theme.laptop} {
    font-size: 32px;
  }
`;

export default LoginInput;
