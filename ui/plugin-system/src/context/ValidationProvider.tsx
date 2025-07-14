

import { createContext, ReactElement, ReactNode, useContext, useState } from 'react';
import {
  DatasourceDefinition,
  PanelEditorValues,
  VariableDefinition,
  PluginSchema,
  datasourceDefinitionSchema,
  panelEditorSchema as defaultPanelEditorSchema,
  variableDefinitionSchema,
  buildDatasourceDefinitionSchema,
  buildPanelEditorSchema,
  buildVariableDefinitionSchema,
} from '@perses-dev/core';
import { z } from 'zod';

export interface ValidationSchemas {
  datasourceEditorSchema: z.Schema<DatasourceDefinition>;
  panelEditorSchema: z.Schema<PanelEditorValues>;
  variableEditorSchema: z.Schema<VariableDefinition>;
  setDatasourceEditorSchemaPlugin: (pluginSchema: PluginSchema) => void;
  setPanelEditorSchemaPlugin: (pluginSchema: PluginSchema) => void;
  setVariableEditorSchemaPlugin: (pluginSchema: PluginSchema) => void;
}

export const ValidationSchemasContext = createContext<ValidationSchemas | undefined>(undefined);

export function useValidationSchemas(): ValidationSchemas {
  const ctx = useContext(ValidationSchemasContext);
  if (ctx === undefined) {
    throw new Error('No ValidationSchemasContext found. Did you forget a Provider?');
  }
  return ctx;
}

interface ValidationProviderProps {
  children: ReactNode;
}

/*
 * Provide validation schemas for forms handling plugins (datasources, variables, panels).
 */
export function ValidationProvider({ children }: ValidationProviderProps): ReactElement {
  const [datasourceEditorSchema, setDatasourceEditorSchema] =
    useState<z.Schema<DatasourceDefinition>>(datasourceDefinitionSchema);
  const [panelEditorSchema, setPanelEditorSchema] = useState<z.Schema<PanelEditorValues>>(defaultPanelEditorSchema);
  const [variableEditorSchema, setVariableEditorSchema] =
    useState<z.Schema<VariableDefinition>>(variableDefinitionSchema);

  function setDatasourceEditorSchemaPlugin(pluginSchema: PluginSchema): void {
    setDatasourceEditorSchema(buildDatasourceDefinitionSchema(pluginSchema));
  }

  function setPanelEditorSchemaPlugin(pluginSchema: PluginSchema): void {
    setPanelEditorSchema(buildPanelEditorSchema(pluginSchema));
  }

  function setVariableEditorSchemaPlugin(pluginSchema: PluginSchema): void {
    setVariableEditorSchema(buildVariableDefinitionSchema(pluginSchema));
  }

  return (
    <ValidationSchemasContext.Provider
      value={{
        datasourceEditorSchema,
        panelEditorSchema,
        variableEditorSchema,
        setDatasourceEditorSchemaPlugin,
        setPanelEditorSchemaPlugin,
        setVariableEditorSchemaPlugin,
      }}
    >
      {children}
    </ValidationSchemasContext.Provider>
  );
}
