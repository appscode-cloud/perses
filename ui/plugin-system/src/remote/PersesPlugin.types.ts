

export interface PersesPlugin {
  name: string;
  moduleName: string;
  baseURL?: string;
}

export type RemotePluginModule = Record<string, unknown>;
