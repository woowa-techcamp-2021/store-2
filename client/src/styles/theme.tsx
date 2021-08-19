import React, { FC } from 'react';
import { ThemeProvider, createGlobalStyle } from 'lib/woowahan-components';
import BMEULJIRO from '../assets/fonts/BMEULJIRO.woff';
import BMEULJIRO10years from '../assets/fonts/BMEULJIRO10yearslater.woff';
import BMHANNA from '../assets/fonts/BMHANNA11years.woff';
import BMHANNAAir from '../assets/fonts/BMHANNAAir.woff';

const theme = {
  mobile: '@media all and (max-width: 480px)',
  tablet: '@media all and (min-width:480px) and (max-width:1200px)',
  laptop: '@media all and (min-width: 1200px)',

  colorWhite: '#FFFFFF',
  colorOffWhite: '#FCFCFC',
  colorBlack: '#000000',
  colorSoftBlack: '#333333',

  colorBg: '#EBDFCD',
  colorFooter: '#DFD3C0',
  colorPlaceholder: '#7E7E7E',
  colorError: '#F45452',

  colorLine: '#9F927F',
  colorLineLight: '#BAA482',
  colorLineDark: '#665946',

  colorTextBrown: '#665946',
  colorTextBrownLight: '#F7EAD7',
  colorTextBeige: '#C2B39C',

  colorPrimary: '#2AC1BC',
  colorPrimaryLight: '#A0E1E0',
  colorPrimaryDark: '#219A95',

  colorPointDarkGreen: '#124a48',
  colorPointGreen: '#348011',
  colorPointBeige: '#BAA482',
  colorPointBeigeLight: '#F7EAD7',
  colorPointRed: '#9D3622',
  colorPointAqua: '#34C6CF',

  colorGreyDark: '#717171',
  colorGreyMid: '#AEAEAE',
  colorGreyLight: '#D6D6D6',

  colorGithub: '#404040',

  fontBasic: '"Noto Sans KR", sans-serif',
  fontEuljiro: '"BMEULJIRO", sans-serif',
  fontEuljiro10: '"BMEULJIRO10", sans-serif',
  fontHanna: '"BMHANNA", sans-serif',
  fontHannaAir: '"BMHANNAAir", sans-serif',

  weightReg: '400',
  weightMid: '500',
  weightBold: '700',
};

const GlobalStyle = createGlobalStyle`  
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
  @import url('https://meyerweb.com/eric/tools/css/reset/reset.css');
  @import url('https://unpkg.com/sanitize.css');

  @font-face {
    font-family: 'BMEULJIRO';
    src: url(${BMEULJIRO}) format('woff');
  }
  
  @font-face {
    font-family: 'BMEULJIRO10';
    src: url(${BMEULJIRO10years}) format('woff');
  }

  @font-face {
    font-family: 'BMHANNA';
    src: url(${BMHANNA}) format('woff');
  }

  @font-face {
    font-family: 'BMHANNAAir';
    src: url(${BMHANNAAir}) format('woff');
  }

  #root {
    width: 100%;
    height: 100vh;
  }

  a {
    text-decoration: none;
  }

  input, button {
    background: none;
    border: none;
    outline: none;
    padding: none;
  }
  button {
    cursor: pointer;
  }
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
