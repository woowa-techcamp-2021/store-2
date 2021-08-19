import React, { FC, useCallback, useState, useEffect } from 'react';
import { RouterContext } from '../context/router-context';

const BrowserRouter: FC = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handlePopState = useCallback(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
  }, [handlePopState]);

  const push = useCallback((pathname: string) => {
    const pathnameWithoutQuery = pathname.split('?')[0];
    window.history.pushState(null, '', pathname);
    setCurrentPath(pathnameWithoutQuery);
  }, []);

  const replace = useCallback((pathname: string) => {
    const pathnameWithoutQuery = pathname.split('?')[0];
    window.history.replaceState(null, '', pathname);
    setCurrentPath(pathnameWithoutQuery);
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const value = {
    currentPath,
    push,
    replace,
    goBack,
  };

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export default BrowserRouter;
