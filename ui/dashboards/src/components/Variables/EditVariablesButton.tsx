

import { ReactElement, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import PencilIcon from 'mdi-material-ui/PencilOutline';
import { Drawer, InfoTooltip } from '@perses-dev/components';
import { BuiltinVariableDefinition, VariableDefinition } from '@perses-dev/core';
import { useBuiltinVariableDefinitions } from '@perses-dev/plugin-system';
import { TOOLTIP_TEXT, editButtonStyle } from '../../constants';
import {
  ExternalVariableDefinition,
  useExternalVariableDefinitions,
  useVariableDefinitionActions,
  useVariableDefinitions,
} from '../../context';
import { VariableEditor } from './VariableEditor';

export interface EditVariablesButtonProps extends Pick<ButtonProps, 'fullWidth'> {
  /**
   * The variant to use to display the button.
   */
  variant?: 'text' | 'outlined';

  /**
   * The color to use to display the button.
   */
  color?: 'primary' | 'secondary';

  /**
   * The label used inside the button.
   */
  label?: string;
}

export function EditVariablesButton({
  variant = 'text',
  label = 'Variables',
  color = 'primary',
  fullWidth,
}: EditVariablesButtonProps): ReactElement {
  const [isVariableEditorOpen, setIsVariableEditorOpen] = useState(false);
  const variableDefinitions: VariableDefinition[] = useVariableDefinitions();
  const externalVariableDefinitions: ExternalVariableDefinition[] = useExternalVariableDefinitions();
  const builtinVariableDefinitions: BuiltinVariableDefinition[] = useBuiltinVariableDefinitions();
  const { setVariableDefinitions } = useVariableDefinitionActions();

  const openVariableEditor = (): void => {
    setIsVariableEditorOpen(true);
  };

  const closeVariableEditor = (): void => {
    setIsVariableEditorOpen(false);
  };

  return (
    <>
      <InfoTooltip description={TOOLTIP_TEXT.editVariables}>
        <Button
          startIcon={<PencilIcon />}
          onClick={openVariableEditor}
          aria-label={TOOLTIP_TEXT.editVariables}
          variant={variant}
          color={color}
          fullWidth={fullWidth}
          sx={editButtonStyle}
        >
          {label}
        </Button>
      </InfoTooltip>
      <Drawer
        isOpen={isVariableEditorOpen}
        onClose={closeVariableEditor}
        PaperProps={{ sx: { width: '50%' } }}
        data-testid="variable-editor"
      >
        <VariableEditor
          variableDefinitions={variableDefinitions}
          externalVariableDefinitions={externalVariableDefinitions}
          builtinVariableDefinitions={builtinVariableDefinitions}
          onCancel={closeVariableEditor}
          onChange={(variables: VariableDefinition[]) => {
            setVariableDefinitions(variables);
            setIsVariableEditorOpen(false);
          }}
        />
      </Drawer>
    </>
  );
}
