import React, { FC } from 'react';
import { ThemeProvider, createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

const theme: DefaultTheme = {
  mobile: '(max-width: 480px)',
  tablet: '(max-width: 960px)',
  laptop: '(max-width: 1440px)',

  colorWhite: '#FFFFFF',
  colorOffWhite: '#FCFCFC',
  colorBlack: '#000000',
  colorSoftBlack: '#333333',

  colorBg: '#EBDFCD',
  colorPlaceholder: '#7E7E7E',
  colorError: '#F45452',

  colorLine: '#9F927F',
  colorLineLight: '#BAA482',
  colorLineDark: '#665946',

  colorTextBrown: '#665946',
  colorTextBrownLight: '#F7EAD7',

  colorPrimary: '#2AC1BC',
  colorPrimaryLight: '#A0E1E0',
  colorPrimaryDark: '#219A95',

  colorPointDarkGreen: '#11403E',
  colorPointGreen: '#348011',
  colorPointBeige: '#BAA482',
  colorPointBeigeLight: '#F7EAD7',
  colorPointRed: '#9D3622',
  colorPointAqua: '#34C6CF',

  colorGreyMid: '#AEAEAE',
  colorGreyLight: '#D6D6D6',

  colorGithub: '#404040',
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
