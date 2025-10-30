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

import { fetchJson, SecretResource, StatusError } from '@perses-dev/core';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import buildURL from './url-builder';
import { HTTPHeader, HTTPMethodDELETE, HTTPMethodGET, HTTPMethodPOST, HTTPMethodPUT } from './http';
import { buildQueryKey } from './querykey-builder';
import { useAuthToken } from './auth-client';

export const resource = 'secrets';

export function createSecret(owner: string | undefined, entity: SecretResource): Promise<SecretResource> {
  const project = entity.metadata.project;
  const url = buildURL({ resource, project, owner });
  return fetchJson<SecretResource>(url, {
    method: HTTPMethodPOST,
    headers: HTTPHeader,
    body: JSON.stringify(entity),
  });
}

function getSecret(owner: string | undefined, name: string, project: string): Promise<SecretResource> {
  const url = buildURL({ resource, project, name, owner });
  return fetchJson<SecretResource>(url, {
    method: HTTPMethodGET,
    headers: HTTPHeader,
  });
}

function getSecrets(owner: string | undefined, project?: string): Promise<SecretResource[]> {
  const url = buildURL({ resource, project, owner });
  return fetchJson<SecretResource[]>(url, {
    method: HTTPMethodGET,
    headers: HTTPHeader,
  });
}

export function updateSecret(owner: string | undefined, entity: SecretResource): Promise<SecretResource> {
  const name = entity.metadata.name;
  const project = entity.metadata.project;
  const url = buildURL({ resource, project, name, owner });
  return fetchJson<SecretResource>(url, {
    method: HTTPMethodPUT,
    headers: HTTPHeader,
    body: JSON.stringify(entity),
  });
}

export function deleteSecret(owner: string | undefined, entity: SecretResource): Promise<Response> {
  const name = entity.metadata.name;
  const project = entity.metadata.project;
  const url = buildURL({ resource, project, name, owner });
  return fetch(url, {
    method: HTTPMethodDELETE,
    headers: HTTPHeader,
  });
}

/**
 * Used to get a secret from the API.
 * Will automatically be refreshed when cache is invalidated
 */
export function useSecret(name: string, project: string): UseQueryResult<SecretResource, StatusError> {
  const { data: decodedToken } = useAuthToken();
  const owner = decodedToken?.sub;

  return useQuery<SecretResource, StatusError>({
    queryKey: buildQueryKey({ resource, name, parent: project }),
    queryFn: () => {
      return getSecret(owner, name, project);
    },
    enabled: !!owner,
  });
}

/**
 * Used to get secrets from the API.
 * Will automatically be refreshed when cache is invalidated
 */
export function useSecretList(project?: string): UseQueryResult<SecretResource[], StatusError> {
  const { data: decodedToken } = useAuthToken();
  const owner = decodedToken?.sub;

  return useQuery<SecretResource[], StatusError>({
    queryKey: buildQueryKey({ resource, parent: project }),
    queryFn: () => {
      return getSecrets(owner, project);
    },
    enabled: !!owner,
  });
}

/**
 * Returns a mutation that can be used to create a secret.
 * Will automatically refresh the cache for all the list.
 *
 * Note: the project input shouldn't be mandatory according to the API, but it is here for cache considerations.
 * @param project
 */
export function useCreateSecretMutation(
  project: string
): UseMutationResult<SecretResource, StatusError, SecretResource> {
  const queryClient = useQueryClient();
  const queryKey = buildQueryKey({ resource, parent: project });

  const { data: decodedToken } = useAuthToken();
  const owner = decodedToken?.sub;

  return useMutation<SecretResource, StatusError, SecretResource>({
    mutationKey: queryKey,
    mutationFn: (secret: SecretResource) => {
      return createSecret(owner, secret);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: [...queryKey] });
    },
  });
}

/**
 * Returns a mutation that can be used to update a secret.
 * Will automatically refresh the cache for all the list.
 *
 * Note: the project input shouldn't be mandatory according to the API, but it is here for cache considerations.
 * @param project
 */
export function useUpdateSecretMutation(
  project: string
): UseMutationResult<SecretResource, StatusError, SecretResource> {
  const queryClient = useQueryClient();
  const queryKey = buildQueryKey({ resource, parent: project });

  const { data: decodedToken } = useAuthToken();
  const owner = decodedToken?.sub;

  return useMutation<SecretResource, StatusError, SecretResource>({
    mutationKey: queryKey,
    mutationFn: (secret: SecretResource) => {
      return updateSecret(owner, secret);
    },
    onSuccess: (entity: SecretResource) => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [...queryKey, entity.metadata.name] }),
        queryClient.invalidateQueries({ queryKey }),
      ]);
    },
  });
}

/**
 * Returns a mutation that can be used to delete a secret.
 * Will automatically refresh the cache for all the list.
 *
 * Note: the project input shouldn't be mandatory according to the API, but it is here for cache considerations.
 * @param project
 */
export function useDeleteSecretMutation(
  project: string
): UseMutationResult<SecretResource, StatusError, SecretResource> {
  const queryClient = useQueryClient();
  const queryKey = buildQueryKey({ resource, parent: project });

  const { data: decodedToken } = useAuthToken();
  const owner = decodedToken?.sub;

  return useMutation<SecretResource, StatusError, SecretResource>({
    mutationKey: queryKey,
    mutationFn: async (entity: SecretResource) => {
      await deleteSecret(owner, entity);
      return entity;
    },
    onSuccess: (entity: SecretResource) => {
      queryClient.removeQueries({ queryKey: [...queryKey, entity.metadata.name] });
      return queryClient.invalidateQueries({ queryKey });
    },
  });
}
