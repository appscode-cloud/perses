

import { useSnackbar } from '@perses-dev/components';
import Brightness5 from 'mdi-material-ui/Brightness5';
import Brightness4 from 'mdi-material-ui/Brightness4';
import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';
import React, { ReactElement } from 'react';
import { useDarkMode } from '../../context/DarkMode';

export function ThemeSwitch(props: { isAuthEnabled: boolean }): ReactElement {
  const { isDarkModeEnabled, setDarkMode } = useDarkMode();
  const { exceptionSnackbar } = useSnackbar();
  const handleDarkModeChange = (): void => {
    try {
      setDarkMode(!isDarkModeEnabled);
    } catch (e) {
      exceptionSnackbar(e);
    }
  };
  const swapIcon = (): ReactElement => {
    return isDarkModeEnabled ? <Brightness5 id="dark" /> : <Brightness4 id="light" />;
  };
  if (props.isAuthEnabled) {
    return (
      <MenuItem onClick={handleDarkModeChange}>
        <ListItemIcon>{swapIcon()}</ListItemIcon>
        Switch Theme
      </MenuItem>
    );
  }
  return (
    <Tooltip title="Switch Theme">
      <IconButton onClick={handleDarkModeChange} aria-label="Theme" style={{ color: 'white' }}>
        {swapIcon()}
      </IconButton>
    </Tooltip>
  );
}
