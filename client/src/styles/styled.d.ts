import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mobile: string;
    tablet: string;
    laptop: string;

    colorWhite: string;
    colorOffWhite: string;
    colorBlack: string;
    colorSoftBlack: string;

    colorBg: string;
    colorPlaceholder: string;
    colorError: string;

    colorLine: string;
    colorLineLight: string;
    colorLineDark: string;

    colorTextBrown: string;
    colorTextBrownLight: string;

    colorPrimary: string;
    colorPrimaryLight: string;
    colorPrimaryDark: string;

    colorPointDarkGreen: string;
    colorPointGreen: string;
    colorPointBeige: string;
    colorPointBeigeLight: string;
    colorPointRed: string;
    colorPointAqua: string;

    colorGreyMid: string;
    colorGreyLight: string;

    colorGithub: string;

    fontBasic: string;
    fontEuljiro: string;
    fontEuljiro10: string;
    fontHanna: string;
    fontHannaAir: string;

    weightReg: string;
    weightMid: string;
    weightBold: string;
  }
}
