import { useContext } from 'react';
import { IRouterContext, RouterContext } from '../context/router-context';

const useHistory = (): IRouterContext => {
  return useContext(RouterContext);
};

export default useHistory;
