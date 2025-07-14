

import React, { createContext, useContext, ReactNode } from 'react';

interface QueryCountProviderProps {
  queryCount: number;
  children: ReactNode;
}

const QueryCountContext = createContext<number>(0);

export const QueryCountProvider: React.FC<QueryCountProviderProps> = ({ queryCount, children }) => {
  return <QueryCountContext.Provider value={queryCount}>{children}</QueryCountContext.Provider>;
};

export const useQueryCountContext = (): number => {
  return useContext(QueryCountContext);
};
