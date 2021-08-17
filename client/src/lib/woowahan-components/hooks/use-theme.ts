import { useContext } from 'react';
import { ThemeContext, IThemeContext } from '../components/theme-provider';

const useHistory = (): IThemeContext => {
  return useContext(ThemeContext);
};

export default useHistory;
