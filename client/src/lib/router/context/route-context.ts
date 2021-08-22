import { createContext } from 'react';

export interface IRouteContext {
  [key: string]: string;
}

export const RouteContext = createContext<IRouteContext>({});
