

import { Alert, Autocomplete, Button, Stack, TextField, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';
import Import from 'mdi-material-ui/Import';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from '@perses-dev/components';
import { DashboardResource } from '@perses-dev/core';
import { useProjectList } from '../../model/project-client';
import { useCreateDashboardMutation } from '../../model/dashboard-client';
import { useIsReadonly } from '../../context/Config';

interface PersesFlowProps {
  dashboard: DashboardResource;
}

function PersesFlow({ dashboard }: PersesFlowProps): ReactElement {
  const navigate = useNavigate();
  const isReadonly = useIsReadonly();
  const { exceptionSnackbar } = useSnackbar();
  const [projectName, setProjectName] = useState<string>('');
  const { data, error } = useProjectList();
  const dashboardMutation = useCreateDashboardMutation((data) => {
    navigate(`/projects/${data.metadata.project}/dashboards/${data.metadata.name}`);
  });

  const importOnClick = (): void => {
    dashboard.metadata.project = projectName;
    dashboardMutation.mutate(dashboard);
  };

  if (error) {
    exceptionSnackbar(error);
  }

  return (
    <>
      {data !== undefined && data !== null && (
        <Stack direction="column">
          <Typography variant="h2" sx={{ paddingTop: 2, paddingBottom: 1 }}>
            2. Import
          </Typography>
          <Stack width="100%" gap={1}>
            <Autocomplete
              disablePortal
              options={data.map((project) => project.metadata.name)}
              onInputChange={(event, value) => {
                setProjectName(value);
              }}
              renderInput={(params) => <TextField {...params} required label="Project name" />}
            />
            <Button
              variant="contained"
              disabled={dashboardMutation.isPending || projectName.length === 0 || isReadonly}
              startIcon={<Import />}
              onClick={importOnClick}
            >
              Import
            </Button>
            {dashboardMutation.isError && (
              <Alert variant="outlined" severity="error">
                {dashboardMutation.error.message}
              </Alert>
            )}
            {isReadonly && (
              <Alert severity="warning" sx={{ backgroundColor: 'transparent', padding: 0 }}>
                Dashboard managed via code only.
              </Alert>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default PersesFlow;
