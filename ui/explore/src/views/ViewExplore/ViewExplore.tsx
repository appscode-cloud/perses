

import { Box, BoxProps } from '@mui/material';
import {
  TimeRangeProviderWithQueryParams,
  useInitialRefreshInterval,
  useInitialTimeRange,
} from '@perses-dev/plugin-system';
import { DEFAULT_DASHBOARD_DURATION, DEFAULT_REFRESH_INTERVAL } from '@perses-dev/core';
import { ErrorAlert, ErrorBoundary, combineSx } from '@perses-dev/components';
import {
  DatasourceStoreProviderProps,
  VariableProviderProps,
  DatasourceStoreProvider,
  VariableProvider,
} from '@perses-dev/dashboards';
import React, { ReactElement } from 'react';
import { ViewExploreApp } from './ViewExploreApp';

export interface ViewExploreProps extends Omit<BoxProps, 'children'> {
  datasourceApi: DatasourceStoreProviderProps['datasourceApi'];
  externalVariableDefinitions?: VariableProviderProps['externalVariableDefinitions'];
  exploreTitleComponent?: React.ReactNode;
}

export function ViewExplore(props: ViewExploreProps): ReactElement {
  const { datasourceApi, externalVariableDefinitions, sx, exploreTitleComponent, ...others } = props;

  const initialTimeRange = useInitialTimeRange(DEFAULT_DASHBOARD_DURATION);
  const initialRefreshInterval = useInitialRefreshInterval(DEFAULT_REFRESH_INTERVAL);

  return (
    <DatasourceStoreProvider datasourceApi={datasourceApi}>
      <TimeRangeProviderWithQueryParams
        initialTimeRange={initialTimeRange}
        initialRefreshInterval={initialRefreshInterval}
      >
        <VariableProvider externalVariableDefinitions={externalVariableDefinitions}>
          <Box
            sx={combineSx(
              {
                display: 'flex',
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              },
              sx
            )}
            {...others}
          >
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <ViewExploreApp exploreTitleComponent={exploreTitleComponent} />
            </ErrorBoundary>
          </Box>
        </VariableProvider>
      </TimeRangeProviderWithQueryParams>
    </DatasourceStoreProvider>
  );
}
