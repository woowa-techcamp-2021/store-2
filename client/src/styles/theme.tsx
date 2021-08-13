import React, { FC } from 'react';
import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from 'styled-components';
import reset from 'styled-reset';

const theme: DefaultTheme = {
  // colors
  bodyColor: '#626666',
  // breakpoints
  mobile: '(max-width: 480px)',
  tablet: '(max-width: 960px)',
  laptop: '(max-width: 1440px)',
  // font sizes
  NORMAL_SIZE: '16px',
  SMALL_SIZE: '12px',
};

const GlobalStyle = createGlobalStyle`
  ${reset}

  /* global styles here */
`;

const Theme: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
