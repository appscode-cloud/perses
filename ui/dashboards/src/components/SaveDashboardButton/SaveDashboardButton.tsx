

import { ReactElement, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { isRelativeTimeRange } from '@perses-dev/core';
import { useTimeRange } from '@perses-dev/plugin-system';
import {
  OnSaveDashboard,
  useDashboard,
  useEditMode,
  useSaveChangesConfirmationDialog,
  useVariableDefinitionActions,
} from '../../context';

export interface SaveDashboardButtonProps extends Pick<ButtonProps, 'fullWidth'> {
  onSave?: OnSaveDashboard;
  isDisabled: boolean;
  variant?: 'contained' | 'text' | 'outlined';
}

export const SaveDashboardButton = ({
  onSave,
  isDisabled,
  variant = 'contained',
}: SaveDashboardButtonProps): ReactElement => {
  const [isSavingDashboard, setSavingDashboard] = useState<boolean>(false);
  const { dashboard, setDashboard } = useDashboard();
  const { getSavedVariablesStatus, setVariableDefaultValues } = useVariableDefinitionActions();
  const { isSavedVariableModified } = getSavedVariablesStatus();
  const { timeRange } = useTimeRange();
  const { setEditMode } = useEditMode();
  const { openSaveChangesConfirmationDialog, closeSaveChangesConfirmationDialog } = useSaveChangesConfirmationDialog();

  const onSaveButtonClick = (): void => {
    const isSavedDurationModified =
      isRelativeTimeRange(timeRange) && dashboard.spec.duration !== timeRange.pastDuration;

    // Save dashboard
    // - if active timeRange from plugin-system is relative and different from currently saved
    // - or if the saved variables are different from currently saved
    if (isSavedDurationModified || isSavedVariableModified) {
      openSaveChangesConfirmationDialog({
        onSaveChanges: (saveDefaultTimeRange, saveDefaultVariables) => {
          if (isRelativeTimeRange(timeRange) && saveDefaultTimeRange === true) {
            dashboard.spec.duration = timeRange.pastDuration;
          }
          if (saveDefaultVariables === true) {
            const variables = setVariableDefaultValues();
            dashboard.spec.variables = variables;
          }
          setDashboard(dashboard);
          saveDashboard();
        },
        onCancel: () => {
          closeSaveChangesConfirmationDialog();
        },
        isSavedDurationModified,
        isSavedVariableModified,
      });
    } else {
      saveDashboard();
    }
  };

  const saveDashboard = async (): Promise<void> => {
    if (onSave) {
      try {
        setSavingDashboard(true);
        await onSave(dashboard);
        closeSaveChangesConfirmationDialog();
        setEditMode(false);
      } catch (error) {
        throw new Error(`An error occurred while saving the dashboard. ${error}`);
      } finally {
        setSavingDashboard(false);
      }
    } else {
      setEditMode(false);
    }
  };

  return (
    <Button variant={variant} onClick={onSaveButtonClick} disabled={isDisabled || isSavingDashboard}>
      Save
    </Button>
  );
};
