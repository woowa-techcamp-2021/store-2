import React, { FC, ReactElement } from 'react';
import useHistory from '../hooks/use-history';
import {
  checkPathValidation,
  exactPathValidation,
  pathValidation,
} from '../path-validation';

const Switch: FC = ({ children }) => {
  const routes = React.Children.toArray(children) as ReactElement[];

  const { currentPath } = useHistory();

  for (let i = 0; i < routes.length; i += 1) {
    const { path, exact } = routes[i].props as { path: string; exact: boolean };
    if (
      (exact && checkPathValidation(currentPath, path, exactPathValidation)) ||
      checkPathValidation(currentPath, path, pathValidation)
    ) {
      return routes[i];
    }
  }

  return null;
};

export default Switch;
