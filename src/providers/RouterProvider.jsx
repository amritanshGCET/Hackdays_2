import { useState } from 'react';
import { RouterContext } from '../contexts/RouterContext';

export function RouterProvider({ children }) {
  const [currentRoute, setCurrentRoute] = useState('/');

  const navigate = (path) => {
    setCurrentRoute(path);
  };

  return <RouterContext.Provider value={{ currentRoute, navigate }}>{children}</RouterContext.Provider>;
}