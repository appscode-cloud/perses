import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { DashboardResource, fetchJson, StatusError } from '@perses-dev/core';
import { useMemo } from 'react';
import { useNavHistory } from '../context/DashboardNavHistory';
import { useImportantDashboardSelectors } from '../context/Config';
import { HTTPHeader, HTTPMethodDELETE, HTTPMethodGET, HTTPMethodPOST, HTTPMethodPUT } from './http';
import buildURL from './url-builder';

export const resource = 'dashboards';

type DashboardListOptions = Omit<UseQueryOptions<DashboardResource[], StatusError>, 'queryKey' | 'queryFn'> & {
  project?: string;
  metadataOnly?: boolean;
};

/**
 * Used to create a dashboard in the API.
 * Will automatically invalidate dashboards and force the get query to be executed again.
 */
export function useCreateDashboardMutation(
  onSuccess?: (data: DashboardResource, variables: DashboardResource) => Promise<unknown> | unknown
): UseMutationResult<DashboardResource, StatusError, DashboardResource> {
  const queryClient = useQueryClient();

  return useMutation<DashboardResource, StatusError, DashboardResource>({
    mutationKey: [resource],
    mutationFn: (dashboard) => {
      return createDashboard(dashboard);
    },
    onSuccess: onSuccess,
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });
}

/**
 * Used to get a dashboard in the API.
 * Will automatically be refreshed when cache is invalidated
 */
export function useDashboard(project: string, name: string): UseQueryResult<DashboardResource, StatusError> {
  return useQuery<DashboardResource, StatusError>({
    queryKey: [resource, project, name],
    queryFn: () => {
      return getDashboard(project, name);
    },
  });
}

/**
 * Used to get dashboards in the API.
 * Will automatically be refreshed when cache is invalidated
 */
export function useDashboardList(options: DashboardListOptions): UseQueryResult<DashboardResource[], StatusError> {
  return useQuery<DashboardResource[], StatusError>({
    queryKey: [resource, options.project, options.metadataOnly],
    queryFn: () => {
      return getDashboards(options.project, options.metadataOnly);
    },
    ...options,
  });
}

export interface DatedDashboards {
  dashboard: DashboardResource;
  date: string;
}

/**
 * Used to get dashboards seen recently by the user.
 * Will automatically be refreshed when cache is invalidated or history modified
 */
export function useRecentDashboardList(
  project?: string,
  maxSize?: number
): {
  isLoading: false | true;
  data: DatedDashboards[];
} {
  const { data, isLoading } = useDashboardList({ project: project, metadataOnly: true });
  const history = useNavHistory();

  const result = useMemo(() => {
    // Wrapping dashboard with their last seen date from nav history context
    const result: DatedDashboards[] = [];

    // Iterating with history first to keep history order in the result
    (history ?? []).forEach((historyItem) => {
      const dashboard = (data ?? []).find(
        (dashboard) =>
          historyItem.project === dashboard.metadata.project && historyItem.name === dashboard.metadata.name
      );
      if (dashboard) {
        result.push({ dashboard: dashboard, date: historyItem.date });
      }
    });

    if (maxSize) {
      return result.slice(0, maxSize);
    }

    return result;
  }, [data, history, maxSize]);

  return { data: result, isLoading: isLoading };
}

/**
 * Used to get important dashboards.
 * Will automatically be refreshed when cache is invalidated or history modified
 */
export function useImportantDashboardList(project?: string): { isLoading: false | true; data: DashboardResource[] } {
  const { data: dashboards, isLoading } = useDashboardList({ project: project, metadataOnly: true });
  const importantDashboardSelectors = useImportantDashboardSelectors();

  const importantDashboards = useMemo(() => {
    const result: DashboardResource[] = [];
    importantDashboardSelectors.forEach((selector) => {
      const dashboard = (dashboards ?? []).find(
        (dashboard) => selector.project === dashboard.metadata.project && selector.dashboard === dashboard.metadata.name
      );
      if (dashboard) {
        result.push(dashboard);
      }
    });
    return result;
  }, [dashboards, importantDashboardSelectors]);

  return { data: importantDashboards, isLoading: isLoading };
}

/**
 * Used to update a dashboard in the API.
 * Will automatically invalidate dashboards and force the get query to be executed again.
 */
export function useUpdateDashboardMutation(): UseMutationResult<DashboardResource, Error, DashboardResource> {
  const queryClient = useQueryClient();

  return useMutation<DashboardResource, Error, DashboardResource>({
    mutationKey: [resource],
    mutationFn: (dashboard) => {
      return updateDashboard(dashboard);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });
}

/**
 * Used to delete a dashboard in the API.
 * Will automatically invalidate dashboards and force the get query to be executed again.
 */
export function useDeleteDashboardMutation(): UseMutationResult<DashboardResource, Error, DashboardResource> {
  const queryClient = useQueryClient();
  return useMutation<DashboardResource, Error, DashboardResource>({
    mutationKey: [resource],
    mutationFn: (entity: DashboardResource) => {
      return deleteDashboard(entity).then(() => {
        return entity;
      });
    },
    onSuccess: (dashboard) => {
      queryClient.removeQueries({ queryKey: [resource, dashboard.metadata.project, dashboard.metadata.name] });
      return queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });
}

export function createDashboard(entity: DashboardResource): Promise<DashboardResource> {
  const url = buildURL({ resource: resource, project: entity.metadata.project });
  return fetchJson<DashboardResource>(url, {
    method: HTTPMethodPOST,
    headers: HTTPHeader,
    body: JSON.stringify(entity),
  });
}

export function getDashboard(project: string, name: string): Promise<DashboardResource> {
  const url = buildURL({ resource: resource, project: project, name: name });
  return fetchJson<DashboardResource>(url, {
    method: HTTPMethodGET,
    headers: HTTPHeader,
  });
}

export function getDashboards(project?: string, metadataOnly: boolean = false): Promise<DashboardResource[]> {
  const queryParams = new URLSearchParams();
  if (metadataOnly) {
    queryParams.set('metadata_only', 'true');
  }
  const url = buildURL({ resource: resource, project: project, queryParams: queryParams });
  return fetchJson<DashboardResource[]>(url, {
    method: HTTPMethodGET,
    headers: HTTPHeader,
  });
}

export function updateDashboard(entity: DashboardResource): Promise<DashboardResource> {
  const url = buildURL({ resource: resource, project: entity.metadata.project, name: entity.metadata.name });
  return fetchJson<DashboardResource>(url, {
    method: HTTPMethodPUT,
    headers: HTTPHeader,
    body: JSON.stringify(entity),
  });
}

export function deleteDashboard(entity: DashboardResource): Promise<Response> {
  const url = buildURL({ resource: resource, project: entity.metadata.project, name: entity.metadata.name });
  return fetch(url, {
    method: HTTPMethodDELETE,
    headers: HTTPHeader,
  });
}
