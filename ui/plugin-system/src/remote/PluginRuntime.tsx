/* eslint-disable @typescript-eslint/no-require-imports */

import { FederationHost, init, loadRemote } from '@module-federation/enhanced/runtime';
import * as ReactQuery from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactHookForm from 'react-hook-form';
import * as ReactRouterDOM from 'react-router-dom';
import { PersesPlugin, RemotePluginModule } from './PersesPlugin.types';

let instance: FederationHost | null = null;

const getPluginRuntime = (): FederationHost => {
  if (instance === null) {
    const pluginRuntime = init({
      name: '@perses/perses-ui-host',
      remotes: [], // all remotes are loaded dynamically
      shared: {
        react: {
          version: React.version,
          lib: () => React,
          shareConfig: {
            singleton: true,
            requiredVersion: `^${React.version}`,
          },
        },
        'react-dom': {
          version: '18.3.1',
          lib: () => ReactDOM,
          shareConfig: {
            singleton: true,
            requiredVersion: `^18.3.1`,
          },
        },
        'react-router-dom': {
          version: '6.26.0',
          lib: () => ReactRouterDOM,
          shareConfig: {
            singleton: true,
            requiredVersion: '^6.26.0',
          },
        },
        '@tanstack/react-query': {
          version: '4.39.1',
          lib: () => ReactQuery,
          shareConfig: {
            singleton: true,
            requiredVersion: '^4.39.1',
          },
        },
        'react-hook-form': {
          version: '7.52.2',
          lib: () => ReactHookForm,
          shareConfig: {
            singleton: true,
            requiredVersion: '^7.52.2',
          },
        },
        echarts: {
          version: '5.5.0',
          lib: () => require('echarts'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^5.5.0',
          },
        },
        '@perses-dev/core': {
          version: '0.51.0-rc.1',
          lib: () => require('@perses-dev/core'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^0.51.0-rc.1',
          },
        },
        '@perses-dev/components': {
          version: '0.51.0-rc.1',
          lib: () => require('@perses-dev/components'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^0.51.0-rc.1',
          },
        },
        '@perses-dev/plugin-system': {
          version: '0.51.0-rc.1',
          lib: () => require('@perses-dev/plugin-system'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^0.51.0-rc.1',
          },
        },
        '@perses-dev/explore': {
          version: '0.51.0-rc.1',
          lib: () => require('@perses-dev/explore'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^0.51.0-rc.1',
          },
        },
        '@perses-dev/dashboards': {
          version: '0.51.0-rc.1',
          lib: () => require('@perses-dev/dashboards'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^0.51.0-rc.1',
          },
        },
        // Below are the shared modules that are used by the plugins, this can be part of the SDK
        'date-fns': {
          version: '4.1.0',
          lib: () => require('date-fns'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^4.1.0',
          },
        },
        'date-fns-tz': {
          version: '3.2.0',
          lib: () => require('date-fns-tz'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^3.2.0',
          },
        },
        lodash: {
          version: '4.17.21',
          lib: () => require('lodash'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^4.17.21',
          },
        },
        '@emotion/react': {
          version: '11.11.3',
          lib: () => require('@emotion/react'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^11.11.3',
          },
        },
        '@emotion/styled': {
          version: '11.11.0',
          lib: () => require('@emotion/styled'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^11.11.0',
          },
        },
        '@hookform/resolvers/zod': {
          version: '3.3.4',
          lib: () => require('@hookform/resolvers/zod'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^3.3.4',
          },
        },
        'use-resize-observer': {
          version: '9.1.0',
          lib: () => require('use-resize-observer'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^9.1.0',
          },
        },
        'mdi-material-ui': {
          version: '7.4.0',
          lib: () => require('mdi-material-ui'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^7.4.0',
          },
        },
        immer: {
          version: '10.1.1',
          lib: () => require('immer'),
          shareConfig: {
            singleton: true,
            requiredVersion: '^10.1.1',
          },
        },
      },
    });

    instance = pluginRuntime;

    return instance;
  }
  return instance;
};

const registerRemote = (name: string, baseURL?: string): void => {
  const pluginRuntime = getPluginRuntime();
  const existingRemote = pluginRuntime.options.remotes.find((remote) => remote.name === name);
  if (!existingRemote) {
    const remoteEntryURL = baseURL
      ? `${baseURL}/${name}/mf-manifest.json`
      : `/observe/plugins/${name}/mf-manifest.json`;
    pluginRuntime.registerRemotes([
      {
        name,
        entry: remoteEntryURL,
        alias: name,
      },
    ]);
  }
};

export const loadPlugin = async (
  moduleName: string,
  pluginName: string,
  baseURL?: string
): Promise<RemotePluginModule | null> => {
  registerRemote(moduleName, baseURL);
  return loadRemote<RemotePluginModule>(`${moduleName}/${pluginName}`);
};

export function usePluginRuntime({ plugin }: { plugin: PersesPlugin }): {
  pluginRuntime: FederationHost;
  loadPlugin: () => Promise<RemotePluginModule | null>;
} {
  return {
    pluginRuntime: getPluginRuntime(),
    loadPlugin: () => loadPlugin(plugin.moduleName, plugin.name, plugin.baseURL),
  };
}
