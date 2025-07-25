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

import { UnknownSpec } from '@perses-dev/core';
import { PluginRegistryProps } from '../components';
import { PluginModuleResource, Plugin, PluginLoader, PluginImplementation, PluginType } from '../model';

export type MockPlugin = {
  [T in PluginType]: {
    kind: T;
    spec: { name: string };
    plugin: PluginImplementation<T>;
  };
}[PluginType];

/**
 * Helper for mocking `PluginRegistry` data during tests. Returns props that can be spread on the `PluginRegistry`
 * component so that it will load the mock plugins you provide.
 */
export function mockPluginRegistry(...mockPlugins: MockPlugin[]): Omit<PluginRegistryProps, 'children'> {
  const mockPluginResource: PluginModuleResource = {
    kind: 'PluginModule',
    metadata: {
      name: 'Fake Plugin Module for Tests',
      version: '0',
    },
    spec: {
      // Add metadata for all mock plugins
      plugins: mockPlugins.map(({ kind, spec: { name } }) => ({
        kind,
        spec: {
          name,
          display: {
            name: getMockPluginName(kind, name),
          },
        },
      })),
    },
  };

  const mockPluginModule: Record<string, Plugin<UnknownSpec>> = {};
  for (const mockPlugin of mockPlugins) {
    // "Export" on the module under the same name as the kind the plugin handles
    mockPluginModule[mockPlugin.spec.name] = mockPlugin.plugin;
  }

  const pluginLoader: PluginLoader = {
    getInstalledPlugins() {
      window.console.log('whye');
      return Promise.resolve([mockPluginResource]);
    },
    importPluginModule(/* resource */) {
      console.log('came here');
      return Promise.resolve(mockPluginModule);
    },
  };

  return {
    pluginLoader,
    defaultPluginKinds: {
      TimeSeriesQuery: 'PrometheusTimeSeriesQuery',
    },
  };
}

/**
 * The function that's used to generate the display name of mocked plugins in mockPluginRegistry. Can be useful if you
 * need to interact with some UI component that's displaying it.
 */
export function getMockPluginName(kind: PluginType, name: string): string {
  return `${kind} Plugin for ${name}`;
}
