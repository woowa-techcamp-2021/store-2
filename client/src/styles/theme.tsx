import React, { FC } from 'react';
import { ThemeProvider, createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

const theme: DefaultTheme = {
  bodyColor: '#626666',

  mobile: '(max-width: 480px)',
  tablet: '(max-width: 960px)',
  laptop: '(max-width: 1440px)',
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