

import { DataGrid, GridRow, GridColumnHeaders } from '@mui/x-data-grid';
import { memo, ReactElement, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { NoDataOverlay } from '@perses-dev/components';
import {
  DataGridProperties,
  CommonRow,
  DATA_GRID_INITIAL_STATE_SORT_BY_DISPLAY_NAME,
  GridToolbar,
  PAGE_SIZE_OPTIONS,
  DATA_GRID_STYLES,
} from '../datagrid';

// https://mui.com/x/react-data-grid/performance/
const MemoizedRow = memo(GridRow);
const MemoizedColumnHeaders = memo(GridColumnHeaders);

export interface Row extends CommonRow {
  project: string;
  displayName: string;
  expireAt: string;
}

function NoEphemeralDashboardRowOverlay(): ReactElement {
  return <NoDataOverlay resource="ephemeral dashboards" />;
}

export function EphemeralDashboardDataGrid(props: DataGridProperties<Row>): ReactElement {
  const { columns, rows, initialState, hideToolbar, isLoading } = props;

  const navigate = useNavigate();

  // Merging default initial state with the props initial state (props initial state will overwrite properties)
  const mergedInitialState = useMemo(() => {
    return {
      ...DATA_GRID_INITIAL_STATE_SORT_BY_DISPLAY_NAME,
      ...(initialState || {}),
    } as GridInitialStateCommunity;
  }, [initialState]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <DataGrid
        onRowClick={(params) => navigate(`/projects/${params.row.project}/ephemeraldashboards/${params.row.name}`)}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.name}
        loading={isLoading}
        slots={
          hideToolbar
            ? { noRowsOverlay: NoEphemeralDashboardRowOverlay }
            : {
                toolbar: GridToolbar,
                row: MemoizedRow,
                columnHeaders: MemoizedColumnHeaders,
                noRowsOverlay: NoEphemeralDashboardRowOverlay,
              }
        }
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        initialState={mergedInitialState}
        sx={DATA_GRID_STYLES}
      />
    </div>
  );
}
