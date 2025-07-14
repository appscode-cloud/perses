

import React, { ReactElement, ReactNode } from 'react';

import { JsonParam, StringParam, useQueryParams, withDefault } from 'use-query-params';
import { ExplorerManagerProvider } from './ExplorerManagerProvider';

const exploreQueryConfig = {
  explorer: withDefault(StringParam, undefined),
  data: withDefault(JsonParam, {}),
};

interface ExplorerManagerProviderWithQueryParamsProps {
  children: ReactNode;
}

export function ExplorerManagerProviderWithQueryParams({
  children,
}: ExplorerManagerProviderWithQueryParamsProps): ReactElement {
  const [queryParams, setQueryParams] = useQueryParams(exploreQueryConfig);

  return <ExplorerManagerProvider store={[queryParams, setQueryParams]}>{children}</ExplorerManagerProvider>;
}
