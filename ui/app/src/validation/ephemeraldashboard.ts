

import { z } from 'zod';
import { useMemo } from 'react';
import { durationValidationSchema, nameSchema } from '@perses-dev/core';
import { generateMetadataName } from '../utils/metadata';
import { useEphemeralDashboardList } from '../model/ephemeral-dashboard-client';
import { dashboardDisplayNameValidationSchema } from './dashboard';

export const createEphemeralDashboardDialogValidationSchema = z.object({
  projectName: nameSchema,
  dashboardName: dashboardDisplayNameValidationSchema,
  ttl: durationValidationSchema,
});
export type CreateEphemeralDashboardValidationType = z.infer<typeof createEphemeralDashboardDialogValidationSchema>;

export const updateEphemeralDashboardDialogValidationSchema = z.object({
  dashboardName: dashboardDisplayNameValidationSchema,
  ttl: durationValidationSchema,
});
export type UpdateEphemeralDashboardValidationType = z.infer<typeof updateEphemeralDashboardDialogValidationSchema>;

export function useEphemeralDashboardValidationSchema(projectName?: string): z.ZodSchema {
  const dashboards = useEphemeralDashboardList(projectName);

  return useMemo(() => {
    return createEphemeralDashboardDialogValidationSchema.refine(
      (schema) => {
        return (
          (dashboards.data ?? []).filter(
            (dashboard) =>
              dashboard.metadata.project === schema.projectName &&
              dashboard.metadata.name === generateMetadataName(schema.dashboardName) &&
              dashboard.spec.ttl === schema.ttl
          ).length === 0
        );
      },
      (schema) => ({
        message: `Ephemeral Dashboard name '${schema.dashboardName}' already exists in '${schema.projectName}' project!`,
        path: ['dashboardName'],
      })
    );
  }, [dashboards.data]);
}
