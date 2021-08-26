import React, { FC, useCallback, useState, useEffect } from 'react';
import { RouterContext, IQuery } from '../context/router-context';

const searchToQuery = (search: string) => {
  const queries = new URLSearchParams(search);
  const params: IQuery = {};
  queries.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

const BrowserRouter: FC = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [query, setQuery] = useState<IQuery>(searchToQuery(window.location.search));

  const handlePopState = useCallback(() => {
    setCurrentPath(window.location.pathname);
    setQuery(searchToQuery(window.location.search));
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
  }, [handlePopState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  const push = useCallback((url: string) => {
    const pathname = url.split('?')[0];
    const search = url.split('?')[1];
    window.history.pushState(null, '', url);
    setCurrentPath(pathname);
    setQuery(searchToQuery(search));
  }, []);

  const replace = useCallback((url: string) => {
    const pathname = url.split('?')[0];
    const search = url.split('?')[1];
    window.history.replaceState(null, '', url);
    setCurrentPath(pathname);
    setQuery(searchToQuery(search));
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const value = {
    currentPath,
    query,
    push,
    replace,
    goBack,
  };

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export default BrowserRouter;
