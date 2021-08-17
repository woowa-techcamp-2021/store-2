import styled from 'styled-components';

interface ButtonProps {
  login?: boolean;
  github?: boolean;
  signup?: boolean;
  back?: boolean;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colorWhite};
  font-family: ${({ theme }) => theme.fontEuljiro};
  opacity: 0.9;
  background: ${props => props.login && props.theme.colorLine};
  background: ${props => props.github && props.theme.colorGithub};
  background: ${props => props.signup && props.theme.colorSignup};
  background: ${props => props.back && props.theme.colorSoftBlack};

  &:not(:first-child) {
    margin-top: 10px;
  }

  &:hover {
    opacity: 1;
    font-weight: 600;
    transform: translateY(-5px);
  }

  ${({ theme }) => theme.mobile} {
    height: 66px;
    font-size: 20px;
  }

  ${({ theme }) => theme.tablet} {
    height: 75px;
    font-size: 23px;
  }

  ${({ theme }) => theme.laptop} {
    height: 85px;
    font-size: 26px;
  }
`;

export default Button;
