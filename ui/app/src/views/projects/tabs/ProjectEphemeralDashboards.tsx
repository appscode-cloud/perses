

import { Card, CardProps } from '@mui/material';
import { ReactElement } from 'react';
import { useEphemeralDashboardList } from '../../../model/ephemeral-dashboard-client';
import { EphemeralDashboardList } from '../../../components/EphemeralDashboardList/EphemeralDashboardList';

interface ProjectEphemeralDashboardsProps extends CardProps {
  projectName: string;
  hideToolbar?: boolean;
}

export function ProjectEphemeralDashboards({
  projectName,
  hideToolbar,
  ...props
}: ProjectEphemeralDashboardsProps): ReactElement {
  const { data, isLoading } = useEphemeralDashboardList(projectName);

  return (
    <Card {...props}>
      <EphemeralDashboardList
        ephemeralDashboardList={data ?? []}
        hideToolbar={hideToolbar}
        isLoading={isLoading}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
              project: false,
              version: false,
            },
          },
        }}
      />
    </Card>
  );
}
