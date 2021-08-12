import { useContext } from 'react';

import { RouterContext } from '../context/router-context';

export const useHistory = () => {
  return useContext(RouterContext);
};
