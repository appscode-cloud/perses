

import { StringParam, useQueryParam } from 'use-query-params';
import { ReactElement } from 'react';
import { DashboardProvider, DashboardProviderProps } from './DashboardProvider';

export function DashboardProviderWithQueryParams({ children, initialState }: DashboardProviderProps): ReactElement {
  const [viewPanelRef, setViewPanelRef] = useQueryParam('viewPanelRef', StringParam);

  return (
    <DashboardProvider
      initialState={{
        viewPanelRef: viewPanelRef ?? undefined, // viewPanelRef can be null, forcing to undefined
        setViewPanelRef: setViewPanelRef,
        ...initialState,
      }}
    >
      {children}
    </DashboardProvider>
  );
}
