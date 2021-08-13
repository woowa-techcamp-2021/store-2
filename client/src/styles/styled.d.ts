import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bodyColor: string;
    // breakpoints
    mobile: string;
    tablet: string;
    laptop: string;
    // font sizes
    NORMAL_SIZE: string;
    SMALL_SIZE: string;
  }
}
