import React, { FC, createContext } from 'react';

export interface IThemeContext {
  [key: string]: string;
}

export const ThemeContext = createContext<IThemeContext>({});

const ThemeProvider: FC<{ theme: IThemeContext }> = props => {
  const { children, theme } = props;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
