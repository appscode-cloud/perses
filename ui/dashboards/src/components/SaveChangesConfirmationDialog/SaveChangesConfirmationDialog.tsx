

import { ReactElement, useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';
import { useTimeRange } from '@perses-dev/plugin-system';
import { isRelativeTimeRange, SAVE_DEFAULTS_DIALOG_TEXT } from '@perses-dev/core';
import { Dialog } from '@perses-dev/components';
import { useSaveChangesConfirmationDialog, useVariableDefinitionActions } from '../../context';

export const SaveChangesConfirmationDialog = (): ReactElement => {
  const { saveChangesConfirmationDialog: dialog } = useSaveChangesConfirmationDialog();
  const isSavedDurationModified = dialog?.isSavedDurationModified ?? true;
  const isSavedVariableModified = dialog?.isSavedVariableModified ?? true;
  const [saveDefaultTimeRange, setSaveDefaultTimeRange] = useState(isSavedDurationModified);
  const [saveDefaultVariables, setSaveDefaultVariables] = useState(isSavedVariableModified);

  const { getSavedVariablesStatus } = useVariableDefinitionActions();
  const { modifiedVariableNames } = getSavedVariablesStatus();

  const isOpen = dialog !== undefined;

  const { timeRange } = useTimeRange();
  const currentTimeRangeText = isRelativeTimeRange(timeRange)
    ? `(Last ${timeRange.pastDuration})`
    : '(Absolute time ranges can not be saved)';

  const saveTimeRangeText = `Save current time range as new default ${currentTimeRangeText}`;

  const saveVariablesText = `Save current variable values as new default (${
    modifiedVariableNames.length > 0 ? modifiedVariableNames.join(', ') : 'No modified variables'
  })`;

  return (
    <Dialog open={isOpen}>
      {dialog !== undefined && (
        <>
          <Dialog.Header onClose={() => dialog.onCancel()}>Save Dashboard</Dialog.Header>

          <Dialog.Content>
            <Typography marginBottom={2}>{dialog.description || SAVE_DEFAULTS_DIALOG_TEXT}</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={!isSavedDurationModified || !isRelativeTimeRange(timeRange)}
                    checked={saveDefaultTimeRange && isSavedDurationModified && isRelativeTimeRange(timeRange)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveDefaultTimeRange(e.target.checked)}
                  />
                }
                label={saveTimeRangeText}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={!isSavedVariableModified}
                    checked={saveDefaultVariables && isSavedVariableModified}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveDefaultVariables(e.target.checked)}
                  />
                }
                label={saveVariablesText}
              />
            </FormGroup>
          </Dialog.Content>

          <Dialog.Actions>
            <Dialog.PrimaryButton
              onClick={() => {
                return dialog.onSaveChanges(saveDefaultTimeRange, saveDefaultVariables);
              }}
            >
              Save Changes
            </Dialog.PrimaryButton>
            <Dialog.SecondaryButton onClick={() => dialog.onCancel()}>Cancel</Dialog.SecondaryButton>
          </Dialog.Actions>
        </>
      )}
    </Dialog>
  );
};
