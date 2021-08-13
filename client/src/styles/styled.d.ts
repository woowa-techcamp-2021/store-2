import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bodyColor: string;

    mobile: string;
    tablet: string;
    laptop: string;

    NORMAL_SIZE: string;
    SMALL_SIZE: string;
  }
}
