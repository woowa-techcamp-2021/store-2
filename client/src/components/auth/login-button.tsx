import { Link } from 'lib/router';
import React from 'react';
import styled, { css } from 'styled-components';
import Theme from 'styles/theme';

const LoginButton = styled.button<{ login?: boolean; github?: boolean; signup?: boolean }>`
  ${({ theme }) => theme.mobile} {
    height: 66px;
    font-size: 20px;
  }
  ${({ theme }) => theme.tablet} {
    width: 380px;
    height: 75px;
    font-size: 26px;
  }
  ${({ theme }) => theme.laptop} {
    width: 460px;
    height: 85px;
    font-size: 32px;
  }
  &:not(:first-child) {
    margin-top: 20px;
  }
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colorWhite};
  font-family: ${({ theme }) => theme.fontEuljiro};
  background: ${props => props.login && props.theme.colorLine};
  background: ${props => props.github && props.theme.colorGithub};
  background: ${props => props.signup && props.theme.colorSignup};
`;

export default LoginButton;