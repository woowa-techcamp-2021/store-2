import { createContext } from 'react';

interface IRouterContext {
  currentPath: string;
  push: (pathname: string) => void;
  replace: (pathname: string) => void;
  goBack: () => void;
}

export const RouterContext = createContext<IRouterContext>({
  currentPath: '',
  push: () => {},
  replace: () => {},
  goBack: () => {},
});
