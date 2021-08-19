import { createContext } from 'react';

export interface IQuery {
  [key: string]: string;
}

export interface IRouterContext {
  currentPath: string;
  query: IQuery;
  push: (pathname: string) => void;
  replace: (pathname: string) => void;
  goBack: () => void;
}

export const RouterContext = createContext<IRouterContext>({
  currentPath: '',
  query: {},
  push: () => {},
  replace: () => {},
  goBack: () => {},
});
