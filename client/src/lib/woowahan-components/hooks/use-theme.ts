import { useContext } from 'react';
import { ThemeContext, IThemeContext } from '../components/theme-provider';

const useTheme = (): IThemeContext => {
  return useContext(ThemeContext);
};

export default useTheme;
