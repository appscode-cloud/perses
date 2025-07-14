

import { Drawer, ErrorAlert, ErrorBoundary } from '@perses-dev/components';
import { Variable, VariableDefinition, getVariableProject } from '@perses-dev/core';
import { DatasourceStoreProvider, VariableProviderWithQueryParams } from '@perses-dev/dashboards';
import {
  PluginRegistry,
  TimeRangeProviderWithQueryParams,
  ValidationProvider,
  VariableEditorForm,
  useInitialTimeRange,
  remotePluginLoader,
} from '@perses-dev/plugin-system';
import { ReactElement, useMemo, useState } from 'react';
import { useDatasourceApi } from '../../model/datasource-api';
import { DeleteResourceDialog } from '../dialogs';
import { DrawerProps } from '../form-drawers';

interface VariableDrawerProps<T extends Variable> extends DrawerProps<T> {
  variable: T;
}

export function VariableDrawer<T extends Variable>({
  variable,
  action,
  isOpen,
  isReadonly,
  onActionChange,
  onSave,
  onDelete,
  onClose,
}: VariableDrawerProps<T>): ReactElement {
  const projectName = getVariableProject(variable);
  const [isDeleteVariableDialogStateOpened, setDeleteVariableDialogStateOpened] = useState<boolean>(false);

  const datasourceApi = useDatasourceApi();

  const variableDef = useMemo(() => {
    const result = structuredClone(variable.spec);
    result.spec.name = variable.metadata.name;
    return result;
  }, [variable]);

  const handleSave = (definition: VariableDefinition): void => {
    variable.spec = definition;
    variable.metadata.name = definition.spec.name;
    if (onSave) {
      onSave(variable);
    }
  };

  const initialTimeRange = useInitialTimeRange('1h');

  // Disables closing on click out. This is a quick-win solution to avoid losing draft changes.
  // -> TODO find a way to enable closing by clicking-out in edit view, with a discard confirmation modal popping up
  const handleClickOut = (): void => {
    /* do nothing */
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClickOut} data-testid="variable-editor">
      <ErrorBoundary FallbackComponent={ErrorAlert}>
        <PluginRegistry pluginLoader={remotePluginLoader()}>
          <ValidationProvider>
            <DatasourceStoreProvider datasourceApi={datasourceApi} projectName={projectName}>
              <TimeRangeProviderWithQueryParams initialTimeRange={initialTimeRange}>
                <VariableProviderWithQueryParams initialVariableDefinitions={[]}>
                  <VariableEditorForm
                    initialVariableDefinition={variableDef}
                    action={action}
                    isDraft={false}
                    isReadonly={isReadonly}
                    onActionChange={onActionChange}
                    onSave={handleSave}
                    onClose={onClose}
                    onDelete={onDelete ? (): void => setDeleteVariableDialogStateOpened(true) : undefined}
                  />
                </VariableProviderWithQueryParams>
              </TimeRangeProviderWithQueryParams>
            </DatasourceStoreProvider>
          </ValidationProvider>
        </PluginRegistry>
        {onDelete && (
          <DeleteResourceDialog
            open={isDeleteVariableDialogStateOpened}
            resource={variable}
            onClose={() => setDeleteVariableDialogStateOpened(false)}
            onSubmit={(v) =>
              onDelete(v).then(() => {
                setDeleteVariableDialogStateOpened(false);
                onClose();
              })
            }
          />
        )}
      </ErrorBoundary>
    </Drawer>
  );
}
