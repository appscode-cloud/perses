

import { Box, Stack } from '@mui/material';
import { ReactElement } from 'react';

export function DropIndicator(): ReactElement {
  return (
    <Stack direction="row" alignItems="center">
      <Box
        sx={{
          content: '""',
          width: 8,
          height: 8,
          boxSizing: 'border-box',
          position: 'absolute',
          backgroundColor: (theme) => theme.palette.background.default,
          border: (theme) => `2px solid ${theme.palette.info.main}`,
          borderRadius: '50%',
        }}
      ></Box>
      <Box
        sx={{
          content: '""',
          height: 2,
          background: (theme) => theme.palette.info.main,
          width: '100%',
        }}
      ></Box>
    </Stack>
  );
}
