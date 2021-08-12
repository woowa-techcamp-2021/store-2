import { useContext } from 'react';

import { RouteContext } from '../context/route-context';

export const useParams = () => {
  return useContext(RouteContext);
};
