// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { HTTPMethodPOST, HTTPHeader } from './http';
import buildURL from './url-builder';
import { fetchJson, FolderResource, StatusError } from '@perses-dev/core';
import { useAuthToken } from './auth-client';

// change this if Perses uses a different resource name for folders
const folderResource = 'folders';

export function useCreateFolderMutation(
  onSuccess?: (data: FolderResource, variables: FolderResource) => Promise<unknown> | unknown
): UseMutationResult<FolderResource, StatusError, FolderResource> {
  const queryClient = useQueryClient();
  const { data: decodedToken } = useAuthToken();
  const owner = decodedToken?.sub;

  return useMutation<FolderResource, StatusError, FolderResource>({
    mutationKey: [folderResource],
    mutationFn: (folder) => {
      return createFolder(owner, folder);
    },
    onSuccess: onSuccess,
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [folderResource] });
    },
  });
}

export function createFolder(owner: string | undefined, entity: FolderResource): Promise<FolderResource> {
  const url = buildURL({ resource: folderResource, project: entity.metadata.project, owner });
  return fetchJson<FolderResource>(url, {
    method: HTTPMethodPOST,
    headers: HTTPHeader,
    body: JSON.stringify(entity),
  });
}
