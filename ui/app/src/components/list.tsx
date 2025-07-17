import { Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { DispatchWithPromise } from '@perses-dev/core';
import { intlFormatDistance } from 'date-fns';

export const PROJECT_COL_DEF: GridColDef = {
  field: 'project',
  headerName: 'Project',
  type: 'string',
  flex: 2,
  minWidth: 150,
};

export const NAME_COL_DEF: GridColDef = {
  field: 'name',
  headerName: 'Name',
  type: 'string',
  flex: 3,
  minWidth: 150,
};

export const DISPLAY_NAME_COL_DEF: GridColDef = {
  field: 'displayName',
  headerName: 'Display Name',
  type: 'string',
  flex: 3,
  minWidth: 150,
};

export const VERSION_COL_DEF: GridColDef = {
  field: 'version',
  headerName: 'Version',
  type: 'number',
  align: 'right',
  headerAlign: 'right',
  flex: 1,
  minWidth: 80,
};

export const DESCRIPTION_COL_DEF: GridColDef = {
  field: 'description',
  headerName: 'Description',
  type: 'string',
  flex: 3,
  minWidth: 300,
};

export const CREATED_AT_COL_DEF: GridColDef = {
  field: 'createdAt',
  headerName: 'Creation Date',
  type: 'dateTime',
  flex: 1,
  minWidth: 125,
  valueGetter: (_, row) => new Date(row.createdAt),
  renderCell: (params) => (
    <Tooltip title={params.value.toUTCString()} placement="top">
      <span>{intlFormatDistance(params.value, new Date())}</span>
    </Tooltip>
  ),
};

export const UPDATED_AT_COL_DEF: GridColDef = {
  field: 'updatedAt',
  headerName: 'Last Update',
  type: 'dateTime',
  flex: 1,
  minWidth: 125,
  valueGetter: (_, row) => new Date(row.updatedAt),
  renderCell: (params) => (
    <Tooltip title={params.value.toUTCString()} placement="top">
      <span>{intlFormatDistance(params.value, new Date())}</span>
    </Tooltip>
  ),
};

export interface ListProperties {
  hideToolbar?: boolean;
  initialState?: GridInitialStateCommunity;
  isLoading?: boolean;
}

export interface ListPropertiesWithCallbacks<T> extends ListProperties {
  data: T[];
  onCreate: DispatchWithPromise<T>;
  onUpdate: DispatchWithPromise<T>;
  onDelete: DispatchWithPromise<T>;
}
