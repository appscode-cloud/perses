

import { Box } from '@mui/material';
import { VariableDefinition, VariableSpec } from '@perses-dev/core';
import { ReactElement } from 'react';
import {
  ExternalVariableDefinition,
  useExternalVariableDefinitions,
  useVariableDefinitionAndState,
  useVariableDefinitions,
} from '../../context';
import { MAX_VARIABLE_WIDTH, MIN_VARIABLE_WIDTH } from '../../constants';
import { Variable } from './Variable';

export function VariableList(): ReactElement {
  const variableDefinitions: VariableDefinition[] = useVariableDefinitions();
  const externalVariableDefinitions: ExternalVariableDefinition[] = useExternalVariableDefinitions();

  return (
    <>
      {externalVariableDefinitions
        .slice()
        .reverse() // We reverse to have the most prioritized on top
        .map((def) =>
          def.definitions.map((v) => (
            <VariableListItem key={v.spec.name + def.source} spec={v.spec} source={def.source} />
          ))
        )}
      {variableDefinitions.map((v) => (
        <VariableListItem key={v.spec.name} spec={v.spec} />
      ))}
    </>
  );
}

export function VariableListItem({ spec, source }: { spec: VariableSpec; source?: string }): ReactElement | null {
  const ctx = useVariableDefinitionAndState(spec.name, source);
  if (ctx.state?.overridden) {
    return null;
  }
  return (
    <Box
      key={spec.name + source ?? ''}
      display={spec.display?.hidden ? 'none' : undefined}
      minWidth={`${MIN_VARIABLE_WIDTH}px`}
      maxWidth={`${MAX_VARIABLE_WIDTH}px`}
      flexShrink={0}
      data-testid={'variable-' + spec.name}
    >
      <Variable key={spec.name + source ?? ''} name={spec.name} source={source} />
    </Box>
  );
}
