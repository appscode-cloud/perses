

import { Stack } from '@mui/material';
import {
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { ReactElement } from 'react';

export const DATA_GRID_INITIAL_STATE_SORT_BY_NAME = {
  columns: {
    columnVisibilityModel: {},
  },
  sorting: {
    sortModel: [{ field: 'name', sort: 'asc' }],
  },
  pagination: {
    paginationModel: { pageSize: 10, page: 0 },
  },
};

export const DATA_GRID_INITIAL_STATE_SORT_BY_DISPLAY_NAME = {
  columns: {
    columnVisibilityModel: {},
  },
  sorting: {
    sortModel: [{ field: 'displayName', sort: 'asc' }],
  },
  pagination: {
    paginationModel: { pageSize: 10, page: 0 },
  },
};

export const DATA_GRID_STYLES = {
  // disable cell selection style
  '.MuiDataGrid-columnHeader:focus': {
    outline: 'none',
  },
  // disable cell selection style
  '.MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  // pointer cursor on ALL rows
  '& .MuiDataGrid-row:hover': {
    cursor: 'pointer',
  },
};

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export function GridToolbar(): ReactElement {
  return (
    <GridToolbarContainer>
      <Stack direction="row" width="100%" gap={4} m={2}>
        <Stack sx={{ flexShrink: 1 }} width="100%">
          <GridToolbarQuickFilter sx={{ width: '100%' }} />
        </Stack>
        <Stack direction="row" sx={{ flexShrink: 3 }} width="100%">
          <GridToolbarColumnsButton slotProps={{ button: { sx: { width: '100%' } } }} />
          <GridToolbarFilterButton slotProps={{ button: { sx: { width: '100%' } } }} />
        </Stack>
      </Stack>
    </GridToolbarContainer>
  );
}

export interface CommonRow {
  name: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface DataGridProperties<T extends GridValidRowModel> {
  columns: Array<GridColDef<T>>;
  rows: T[];
  initialState?: GridInitialStateCommunity;
  hideToolbar?: boolean;
  isLoading?: boolean;
}

export interface DataGridPropertiesWithCallback<T extends GridValidRowModel> extends DataGridProperties<T> {
  onRowClick: (name: string, project?: string) => void;
}
