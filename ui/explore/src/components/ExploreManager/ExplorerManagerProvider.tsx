

import { createContext, ReactElement, ReactNode, useContext, useState } from 'react';

interface ExplorerState<T> {
  explorer?: string;
  data: T;
  // tab: number;
  // queries: QueryDefinition[];
}

interface ExplorerManagerContextType<T> {
  /** observability signal, for example metrics or traces */
  explorer?: string;
  data: T;
  setExplorer: (explorer: string) => void;
  setData: (data: T) => void;
}

const ExplorerManagerContext = createContext<ExplorerManagerContextType<unknown> | undefined>(undefined);

interface ExplorerManagerProviderProps {
  children: ReactNode;
  store?: [ExplorerState<unknown>, (state: ExplorerState<unknown>) => void];
}

export function ExplorerManagerProvider({
  children,
  store: externalStore,
}: ExplorerManagerProviderProps): ReactElement {
  // cache the state of currently not rendered explore UIs
  const [explorerStateCache, setExplorerStateCache] = useState<
    Record<string, Omit<ExplorerState<unknown>, 'explorer'>>
  >({});
  // local store in case external store is not provided by prop
  const localStore = useState<ExplorerState<unknown>>({ explorer: undefined, data: {} });
  // use store provided by 'store' prop if available, otherwise use local store
  const [explorerState, setExplorerState] = externalStore ? externalStore : localStore;
  const { explorer, data } = explorerState;

  function setExplorer(newExplorer: string): void {
    if (explorer) {
      // store current explorer state
      explorerStateCache[explorer] = { data };
      setExplorerStateCache(explorerStateCache);
    }

    // restore previous explorer state (if any)
    const state = explorerStateCache[newExplorer] ?? { data: {} };
    setExplorerState({ explorer: newExplorer, data: state.data });
  }

  function setData(newData: unknown): void {
    setExplorerState({ explorer, data: newData });
  }

  return (
    <ExplorerManagerContext.Provider value={{ explorer, data, setExplorer, setData }}>
      {children}
    </ExplorerManagerContext.Provider>
  );
}

export function useExplorerManagerContext<T>(): ExplorerManagerContextType<T> {
  const ctx = useContext(ExplorerManagerContext);
  if (ctx === undefined) {
    throw new Error('No ExplorerManagerContext found. Did you forget a Provider?');
  }
  return ctx as ExplorerManagerContextType<T>;
}
