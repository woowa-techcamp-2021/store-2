import React, { FC } from 'react';
import useHistory from '../hooks/use-history';
import { RouteContext } from '../context/route-context';
import { checkPathValidation, exactPathValidation, pathValidation } from '../path-validation';

interface IRoute {
  path: string;
  component: FC;
  exact?: boolean;
}

const Route: FC<IRoute> = ({ component, path, exact }) => {
  const { currentPath } = useHistory();

  // TODO: 좀 더 세련된 방법으로
  const pathSplit = path.split('/');
  const currentPathSplit = currentPath.split('?')[0].split('/');

  const arr: [string, number][] = [];
  pathSplit.forEach((v, i) => {
    if (/^:/.test(v)) arr.push([v.slice(1), i]);
  });

  const params: Record<string, string> = {};
  arr.forEach(([v, i]) => {
    params[v] = currentPathSplit[i];
  });

  if (exact) {
    if (!checkPathValidation(currentPath, path, exactPathValidation)) {
      return null;
    }
  } else if (!checkPathValidation(currentPath, path, pathValidation)) {
    return null;
  }

  return <RouteContext.Provider value={params}>{React.createElement(component)}</RouteContext.Provider>;
};

export default Route;
