import { useContext } from 'react';
import { IRouteContext, RouteContext } from '../context/route-context';

const useParams = (): IRouteContext => {
  return useContext(RouteContext);
};

export default useParams;
