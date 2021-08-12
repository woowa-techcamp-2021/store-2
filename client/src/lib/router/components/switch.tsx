import React, { FC, ReactElement } from 'react';
import { useHistory } from '../index';
import {
  checkPathValidation,
  exactPathValidation,
  pathValidation,
} from '../path-validation';

export const Switch: FC = ({ children }) => {
  const routes = React.Children.toArray(children) as ReactElement[];

  const { currentPath } = useHistory();

  for (let i = 0; i < routes.length; i++) {
    const { path, exact } = routes[i].props;
    if (
      (exact && checkPathValidation(currentPath, path, exactPathValidation)) ||
      checkPathValidation(currentPath, path, pathValidation)
    ) {
      return routes[i];
    }
  }

  return null;
};
