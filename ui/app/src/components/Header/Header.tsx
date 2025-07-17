import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Button, Divider, Toolbar } from '@mui/material';
import Cog from 'mdi-material-ui/Cog';
import ShieldStar from 'mdi-material-ui/ShieldStar';
import Compass from 'mdi-material-ui/Compass';
import React from 'react';
import { useIsLaptopSize, useIsMobileSize } from '../../utils/browser-size';
import { AdminRoute, ConfigRoute } from '../../model/route';
import { useIsAuthEnabled, useIsExplorerEnabled } from '../../context/Config';
import { GlobalProject, useHasPartialPermission } from '../../context/Authorization';
import WhitePersesLogo from '../logo/WhitePersesLogo';
import PersesLogoCropped from '../logo/PersesLogoCropped';
import { ToolMenu } from './ToolMenu';
import { AccountMenu } from './AccountMenu';
import { ThemeSwitch } from './ThemeSwitch';
import { SearchBar } from './SearchBar/SearchBar';

export default function Header(): JSX.Element {
  const isLaptopSize = useIsLaptopSize();
  const isMobileSize = useIsMobileSize();
  const isAuthEnabled = useIsAuthEnabled();
  const IsExplorerEnabled = useIsExplorerEnabled();

  const hasPartialPermission = useHasPartialPermission(['read'], GlobalProject, [
    'GlobalDatasource',
    'GlobalRole',
    'GlobalRoleBinding',
    'GlobalSecret',
    'GlobalVariable',
    'User',
  ]);

  return (
    <AppBar position="relative">
      <Toolbar
        sx={{
          backgroundColor: (theme) => theme.palette.designSystem.blue[700],
          '&': {
            minHeight: '40px',
            paddingLeft: 0,
            paddingRight: 0.75,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            flexShrink: isMobileSize ? 2 : 1,
          }}
        >
          <Button
            component={RouterLink}
            to="/"
            sx={{
              padding: 0,
            }}
          >
            {isLaptopSize ? (
              <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Observe</span>
            ) : (
              <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>Observe</span>
            )}
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightColor: 'rgba(255,255,255,0.2)', marginRight: 0.5 }}
          />
        </Box>
        <SearchBar />
        <Box
          sx={{
            width: '100%',
            flexShrink: isMobileSize ? 2 : 1,
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          {isAuthEnabled ? <AccountMenu /> : <ThemeSwitch isAuthEnabled={false} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
