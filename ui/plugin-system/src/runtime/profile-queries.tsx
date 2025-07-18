// Copyright 2025 The Perses Authors
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

import { QueryDefinition, UnknownSpec, ProfileData } from '@perses-dev/core';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { useDatasourceStore } from './datasources';
import { usePluginRegistry } from './plugin-registry';
import { useTimeRange } from './TimeRangeProvider';
export type ProfileQueryDefinition<PluginSpec = UnknownSpec> = QueryDefinition<'ProfileQuery', PluginSpec>;
export const PROFILE_QUERY_KEY = 'ProfileQuery';

/**
 * Run a profile query using a ProfileQuery plugin and return the results
 * @param definitions: dashboard defintion for a profile query
 */
export function useProfileQueries(definitions: ProfileQueryDefinition[]): Array<UseQueryResult<ProfileData>> {
  const { getPlugin } = usePluginRegistry();
  const datasourceStore = useDatasourceStore();
  const { absoluteTimeRange } = useTimeRange();

  const context = {
    datasourceStore,
    absoluteTimeRange,
  };

  // useQueries() handles data fetching from query plugins (e.g. traceQL queries, promQL queries)
  // https://tanstack.com/query/v4/docs/react/reference/useQuery
  return useQueries({
    queries: definitions.map((definition) => {
      const queryKey = [definition, datasourceStore, absoluteTimeRange] as const; // `queryKey` watches and reruns `queryFn` if keys in the array change
      const profileQueryKind = definition?.spec?.plugin?.kind;
      return {
        queryKey: queryKey,
        queryFn: async (): Promise<ProfileData> => {
          const plugin = await getPlugin(PROFILE_QUERY_KEY, profileQueryKind);
          const data = await plugin.getProfileData(definition.spec.plugin.spec, context);
          return data;
        },

        structuralSharing: false,
      };
    }),
  });
}
