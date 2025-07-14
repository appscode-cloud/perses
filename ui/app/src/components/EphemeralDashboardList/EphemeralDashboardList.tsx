

import {
  getResourceDisplayName,
  EphemeralDashboardResource,
  parseDurationString,
  getResourceExtendedDisplayName,
} from '@perses-dev/core';
import { Box, Stack, Tooltip } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import DeleteIcon from 'mdi-material-ui/DeleteOutline';
import PencilIcon from 'mdi-material-ui/Pencil';
import { ReactElement, useCallback, useMemo, useState } from 'react';
import { intlFormatDistance, add } from 'date-fns';
import { useSnackbar } from '@perses-dev/components';
import { DeleteResourceDialog, UpdateEphemeralDashboardDialog } from '../dialogs';
import { CRUDGridActionsCellItem } from '../CRUDButton/CRUDGridActionsCellItem';
import {
  CREATED_AT_COL_DEF,
  DISPLAY_NAME_COL_DEF,
  ListProperties,
  PROJECT_COL_DEF,
  UPDATED_AT_COL_DEF,
  VERSION_COL_DEF,
} from '../list';
import { useDeleteEphemeralDashboardMutation } from '../../model/ephemeral-dashboard-client';
import { EphemeralDashboardDataGrid, Row } from './EphemeralDashboardDataGrid';

export interface EphemeralDashboardListProperties extends ListProperties {
  ephemeralDashboardList: EphemeralDashboardResource[];
}

/**
 * Display ephemeral dashboards in a table style.
 * @param props.ephemeralDashboardList Contains all ephemeral dashboards to display
 * @param props.hideToolbar Hide toolbar if enabled
 * @param props.initialState Provide a way to override default initialState
 * @param props.isLoading Display a loading circle if enabled
 */
export function EphemeralDashboardList(props: EphemeralDashboardListProperties): ReactElement {
  const { ephemeralDashboardList, hideToolbar, isLoading, initialState } = props;
  const { successSnackbar, exceptionSnackbar } = useSnackbar();
  const deleteEphemeralDashboardMutation = useDeleteEphemeralDashboardMutation();

  const getDashboard = useCallback(
    (project: string, name: string) => {
      return ephemeralDashboardList.find(
        (ephemeralDashboard) =>
          ephemeralDashboard.metadata.project === project && ephemeralDashboard.metadata.name === name
      );
    },
    [ephemeralDashboardList]
  );

  const getExpirationDate = useCallback((ephemeralDashboard: EphemeralDashboardResource): string => {
    return add(
      ephemeralDashboard.metadata.updatedAt ? new Date(ephemeralDashboard.metadata.updatedAt) : new Date(),
      parseDurationString(ephemeralDashboard.spec.ttl)
    ).toISOString();
  }, []);

  const rows = useMemo(() => {
    return ephemeralDashboardList.map(
      (ephemeralDashboard) =>
        ({
          project: ephemeralDashboard.metadata.project,
          name: ephemeralDashboard.metadata.name,
          displayName: getResourceDisplayName(ephemeralDashboard),
          expireAt: getExpirationDate(ephemeralDashboard),
          version: ephemeralDashboard.metadata.version,
          createdAt: ephemeralDashboard.metadata.createdAt,
          updatedAt: ephemeralDashboard.metadata.updatedAt,
        }) as Row
    );
  }, [ephemeralDashboardList, getExpirationDate]);

  const [targetedEphemeralDashboard, setTargetedDashboard] = useState<EphemeralDashboardResource>();
  const [isRenameEphemeralDashboardDialogStateOpened, setRenameEphemeralDashboardDialogStateOpened] =
    useState<boolean>(false);
  const [isDeleteEphemeralDashboardDialogStateOpened, setDeleteEphemeralDashboardDialogStateOpened] =
    useState<boolean>(false);

  const onRenameButtonClick = useCallback(
    (project: string, name: string) => (): void => {
      setTargetedDashboard(getDashboard(project, name));
      setRenameEphemeralDashboardDialogStateOpened(true);
    },
    [getDashboard]
  );

  const handleEphemeralDashboardDelete = useCallback(
    (dashboard: EphemeralDashboardResource): Promise<void> =>
      new Promise((resolve, reject) => {
        deleteEphemeralDashboardMutation.mutate(dashboard, {
          onSuccess: (deletedDashboard: EphemeralDashboardResource) => {
            successSnackbar(`Dashboard ${getResourceExtendedDisplayName(deletedDashboard)} was successfully deleted`);
            resolve();
          },
          onError: (err) => {
            exceptionSnackbar(err);
            reject();
            throw err;
          },
        });
      }),
    [exceptionSnackbar, successSnackbar, deleteEphemeralDashboardMutation]
  );

  const onDeleteButtonClick = useCallback(
    (project: string, name: string) => (): void => {
      setTargetedDashboard(getDashboard(project, name));
      setDeleteEphemeralDashboardDialogStateOpened(true);
    },
    [getDashboard]
  );

  const columns = useMemo<Array<GridColDef<Row>>>(
    () => [
      PROJECT_COL_DEF,
      DISPLAY_NAME_COL_DEF,
      VERSION_COL_DEF,
      {
        field: 'expireAt',
        headerName: 'Expiration Date',
        type: 'dateTime',
        flex: 3,
        minWidth: 150,
        valueGetter: (_, row): Date => new Date(row.expireAt),
        renderCell: (params): ReactElement => (
          <Tooltip title={params.value.toUTCString()} placement="top">
            <span>{intlFormatDistance(params.value, new Date())}</span>
          </Tooltip>
        ),
      },
      CREATED_AT_COL_DEF,
      UPDATED_AT_COL_DEF,
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        flex: 0.5,
        minWidth: 100,
        getActions: (params: GridRowParams<Row>): ReactElement[] => [
          <CRUDGridActionsCellItem
            key={params.id + '-edit'}
            icon={<PencilIcon />}
            label="Rename"
            action="update"
            scope="Dashboard"
            project={params.row.project}
            onClick={onRenameButtonClick(params.row.project, params.row.name)}
          />,
          <CRUDGridActionsCellItem
            key={params.id + '-delete'}
            icon={<DeleteIcon />}
            label="Delete"
            action="delete"
            scope="Dashboard"
            project={params.row.project}
            onClick={onDeleteButtonClick(params.row.project, params.row.name)}
          />,
        ],
      },
    ],
    [onRenameButtonClick, onDeleteButtonClick]
  );

  return (
    <Stack width="100%">
      <EphemeralDashboardDataGrid
        rows={rows}
        columns={columns}
        initialState={initialState}
        hideToolbar={hideToolbar}
        isLoading={isLoading}
      />
      <Box>
        {targetedEphemeralDashboard && (
          <>
            <UpdateEphemeralDashboardDialog
              open={isRenameEphemeralDashboardDialogStateOpened}
              onClose={() => setRenameEphemeralDashboardDialogStateOpened(false)}
              ephemeralDashboard={targetedEphemeralDashboard}
            />
            <DeleteResourceDialog
              resource={targetedEphemeralDashboard}
              open={isDeleteEphemeralDashboardDialogStateOpened}
              onSubmit={() => handleEphemeralDashboardDelete(targetedEphemeralDashboard)}
              onClose={() => setDeleteEphemeralDashboardDialogStateOpened(false)}
            />
          </>
        )}
      </Box>
    </Stack>
  );
}
