

import { ReactElement, useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  SxProps,
  Theme,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import PinOutline from 'mdi-material-ui/PinOutline';
import PinOffOutline from 'mdi-material-ui/PinOffOutline';
import { TimeRangeControls } from '@perses-dev/plugin-system';
import { VariableList } from '../Variables';

interface DashboardStickyToolbarProps {
  initialVariableIsSticky?: boolean;
  sx?: SxProps<Theme>;
}

export function DashboardStickyToolbar(props: DashboardStickyToolbarProps): ReactElement {
  const [isPin, setIsPin] = useState(props.initialVariableIsSticky);

  const scrollTrigger = useScrollTrigger({ disableHysteresis: true });
  const isSticky = scrollTrigger && props.initialVariableIsSticky && isPin;

  const isBiggerThanMd = useMediaQuery(useTheme().breakpoints.up('md'));

  return (
    // marginBottom={-1} counteracts the marginBottom={1} on every variable input.
    // The margin on the inputs is for spacing between inputs, but is not meant to add space to bottom of the container.
    <Box marginBottom={-1} data-testid="variable-list">
      <AppBar
        color="inherit"
        position={isSticky ? 'fixed' : 'static'}
        elevation={isSticky ? 4 : 0}
        sx={{ backgroundColor: 'inherit', ...props.sx }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            flexDirection: isBiggerThanMd ? 'row' : 'column',
          }}
        >
          <Box
            display="flex"
            flexWrap={!isSticky && isBiggerThanMd ? 'wrap' : 'nowrap'}
            maxWidth={isSticky || !isBiggerThanMd ? '100vw' : '100%'}
            maxHeight="150px" // Limit the vertical space used to ~3 rows of variables
            pt={1}
            pl={isSticky ? 1 : 0}
            mt={isSticky && isBiggerThanMd ? 0.5 : 0}
            ml={isSticky && isBiggerThanMd ? 0.5 : 0}
            sx={{
              overflowX: !isSticky && isBiggerThanMd ? 'hidden' : 'auto',
              // Firefox:
              scrollbarWidth: 'thin',
              // Safari and Chrome:
              '&::-webkit-scrollbar': {
                height: '8px',
                backgroundColor: (theme) => theme.palette.grey['300'],
              },
              '&::-webkit-scrollbar-thumb': {
                background: (theme) => theme.palette.grey['600'],
              },
            }}
            gap={1}
          >
            <VariableList />
            {props.initialVariableIsSticky && (
              <IconButton style={{ width: 'fit-content', height: 'fit-content' }} onClick={() => setIsPin(!isPin)}>
                {isPin ? <PinOutline /> : <PinOffOutline />}
              </IconButton>
            )}
          </Box>
          {isSticky && (
            <Stack
              m={isBiggerThanMd ? 1.5 : 1}
              mt={isBiggerThanMd ? 1.5 : 0}
              ml={isBiggerThanMd ? 1.5 : 'auto'}
              direction="row"
              justifyContent="end"
            >
              <TimeRangeControls />
            </Stack>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}
