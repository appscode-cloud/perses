import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { HTTPMethodPOST, HTTPHeader, HTTPMethodGET } from './http';
import buildURL from './url-builder';
import { fetchJson, FolderResource, DashboardResource, StatusError } from '@perses-dev/core';
import { useAuthToken } from './auth-client';

export interface FolderWithDashboards extends FolderResource {
  dashboards: DashboardResource[];
}

// change this if Perses uses a different resource name for folders
const folderResource = 'folders';

export function createFolder(owner: string | undefined, entity: FolderResource): Promise<FolderResource> {
  const url = buildURL({ resource: folderResource, project: entity.metadata.project, owner });
  return fetchJson<FolderResource>(url, {
    method: HTTPMethodPOST,
    headers: HTTPHeader,
    body: JSON.stringify(entity),
  });
}

export function getFolders(owner: string | undefined, project?: string): Promise<FolderWithDashboards[]> {
  const url = buildURL({ resource: folderResource, project, owner });
  return fetchJson<FolderWithDashboards[]>(url, {
    method: HTTPMethodGET,
    headers: HTTPHeader,
  });
}

export interface FolderListOptions {
  project?: string;
}

export function useFolderList(options: FolderListOptions): UseQueryResult<FolderWithDashboards[], StatusError> {
  const { data: decodedToken } = useAuthToken();
  const owner = decodedToken?.sub;

  return useQuery<FolderWithDashboards[], StatusError>({
    queryKey: [folderResource, options.project],
    queryFn: () => getFolders(owner, options.project),
    ...options,
  });
}

export function useCreateFolderMutation(
  onSuccess?: (data: FolderResource, variables: FolderResource) => Promise<unknown> | unknown
): UseMutationResult<FolderResource, StatusError, FolderResource> {
  const queryClient = useQueryClient();
  const { data: decodedToken } = useAuthToken();
  const owner = decodedToken?.sub;

  return useMutation<FolderResource, StatusError, FolderResource>({
    mutationKey: [folderResource],
    mutationFn: (folder) => createFolder(owner, folder),
    onSuccess,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [folderResource] }),
  });
}
