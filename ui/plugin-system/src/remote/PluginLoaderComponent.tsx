/* eslint-disable @typescript-eslint/ban-ts-comment */


import { useEffect, useRef, useState } from 'react';
import { PersesPlugin, RemotePluginModule } from './PersesPlugin.types';
import { usePluginRuntime } from './PluginRuntime';

interface PluginLoaderProps<P> {
  plugin: PersesPlugin;
  props?: P;
  field?: string;
}

function PluginContainer<P>({
  pluginFn,
  props,
}: {
  pluginFn: (props: P | undefined) => JSX.Element;
  props: P | undefined;
}): JSX.Element {
  return pluginFn(props);
}

export function PluginLoaderComponent<P>({ plugin, props, field }: PluginLoaderProps<P>): JSX.Element | null {
  const { loadPlugin } = usePluginRuntime({ plugin });
  const [pluginModule, setPluginModule] = useState<RemotePluginModule | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const name = `${plugin.moduleName}-${plugin.name}`;
  const previousPluginName = useRef<string>(name);

  useEffect(() => {
    previousPluginName.current = name;
    setError(null);

    loadPlugin()
      .then((module) => {
        setPluginModule(module);
      })
      .catch((error) => {
        setPluginModule(null);
        console.error(
          `PluginLoaderComponent: Error loading plugin ${plugin.name} from module ${plugin.moduleName}:`,
          error
        );
        setError(
          new Error(`PluginLoaderComponent: Error loading plugin ${plugin.name} from module ${plugin.moduleName}`)
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (error) {
    throw error;
  }

  if (!pluginModule) {
    return null;
  }

  let pluginFunction = pluginModule[plugin.name];

  if (field && pluginFunction && typeof pluginFunction === 'object' && field in pluginFunction) {
    pluginFunction = (pluginFunction as Record<string, unknown>)[field];
  }

  if (!pluginFunction) {
    throw new Error(`PluginLoaderComponent: Plugin module ${plugin.moduleName} does not have a ${plugin.name} export`);
  }

  if (typeof pluginFunction !== 'function') {
    throw new Error(`PluginLoaderComponent: Plugin ${plugin.name} export is not a function`);
  }

  // make sure to re mount the plugin when changes, to avoid mismatch in hooks ordering when re rendering
  if (previousPluginName.current !== name) {
    return null;
  }

  return (
    <PluginContainer key={name} pluginFn={pluginFunction as (props: P | undefined) => JSX.Element} props={props} />
  );
}
