

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '@perses-dev/components';
import {
  EphemeralDashboardResource,
  getResourceExtendedDisplayName,
  DEFAULT_DASHBOARD_DURATION,
  DEFAULT_REFRESH_INTERVAL,
  DashboardResource,
  EphemeralDashboardSpec,
  DurationString,
} from '@perses-dev/core';
import { ReactElement, useCallback } from 'react';
import { useCreateEphemeralDashboardMutation } from '../../../model/ephemeral-dashboard-client';
import { generateMetadataName } from '../../../utils/metadata';
import { HelperDashboardView } from './HelperDashboardView';

export interface CreateEphemeralDashboardState {
  name: string;
  spec?: EphemeralDashboardSpec;
  ttl: DurationString;
}

/**
 * The View for creating a new EphemeralDashboard.
 */
function CreateEphemeralDashboardView(): ReactElement | null {
  const { projectName } = useParams();
  const location = useLocation();
  const state: CreateEphemeralDashboardState = location.state;

  if (!projectName || !state.name) {
    throw new Error('Unable to get the ephemeralDashboard or project name');
  }

  const navigate = useNavigate();
  const { successSnackbar, exceptionSnackbar } = useSnackbar();
  const createEphemeralDashboardMutation = useCreateEphemeralDashboardMutation();

  const data: EphemeralDashboardResource = {
    kind: 'EphemeralDashboard',
    metadata: {
      name: generateMetadataName(state.name),
      project: projectName,
      version: 0,
    },
    spec: state.spec ?? {
      ttl: state.ttl,
      display: {
        name: state.name,
      },
      duration: DEFAULT_DASHBOARD_DURATION,
      refreshInterval: DEFAULT_REFRESH_INTERVAL,
      variables: [],
      layouts: [],
      panels: {},
    },
  };

  const handleEphemeralDashboardSave = useCallback(
    (data: DashboardResource | EphemeralDashboardResource) => {
      if (data.kind !== 'EphemeralDashboard') {
        throw new Error('Invalid kind');
      }
      return createEphemeralDashboardMutation.mutateAsync(data, {
        onSuccess: (createdEphemeralDashboard: EphemeralDashboardResource) => {
          successSnackbar(
            `Ephemeral Dashboard ${getResourceExtendedDisplayName(
              createdEphemeralDashboard
            )} has been successfully created`
          );
          navigate(
            `/projects/${createdEphemeralDashboard.metadata.project}/ephemeralDashboards/${createdEphemeralDashboard.metadata.name}`
          );
          return createdEphemeralDashboard;
        },
        onError: (err) => {
          exceptionSnackbar(err);
          throw err;
        },
      });
    },
    [createEphemeralDashboardMutation, exceptionSnackbar, navigate, successSnackbar]
  );

  const handleEphemeralDashboardDiscard = useCallback(() => {
    navigate(`/projects/${projectName}`);
  }, [navigate, projectName]);

  if (!data || data.spec === undefined) return null;

  return (
    <HelperDashboardView
      dashboardResource={data as unknown as DashboardResource}
      onSave={handleEphemeralDashboardSave}
      onDiscard={handleEphemeralDashboardDiscard}
      isReadonly={false}
      isEditing={true}
      isCreating={true}
    />
  );
}

export default CreateEphemeralDashboardView;
