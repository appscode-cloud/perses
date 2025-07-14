

import { SxProps, Theme } from '@mui/material';

export const editButtonStyle: SxProps<Theme> = {
  whiteSpace: 'nowrap',
  minWidth: 'auto',
  '& .MuiButton-startIcon': {
    marginRight: 0.5,
  },
};

export const MIN_VARIABLE_WIDTH = 120;
export const MAX_VARIABLE_WIDTH = 500;

export const HEADER_SMALL_WIDTH = 170;
export const HEADER_MEDIUM_WIDTH = 220;
export const HEADER_ACTIONS_CONTAINER_NAME = 'header-actions-container';
