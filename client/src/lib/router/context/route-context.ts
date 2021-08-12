import { createContext } from 'react';

interface IRouteContext extends Record<string, unknown> {}

export const RouteContext = createContext<IRouteContext>({});
