import { MouseEvent, ReactElement, useState } from 'react';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import AccountCircle from 'mdi-material-ui/AccountCircle';
import AccountBox from 'mdi-material-ui/AccountBox';
import Logout from 'mdi-material-ui/Logout';
import { useAuthToken } from '../../model/auth-client';
import { ThemeSwitch } from './ThemeSwitch';

export function AccountMenu(): ReactElement {
  const { data: decodedToken } = useAuthToken();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-label="Account menu"
        aria-controls="menu-account-list-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-account-list-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        open={anchorEl !== null}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          {decodedToken?.sub}
        </MenuItem>
        <Divider />
        <ThemeSwitch isAuthEnabled />
        <MenuItem component="a" href="/profile">
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem component="a" href="/profile">
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          Switch Org
        </MenuItem>
        <MenuItem component="a" href="/api/auth/logout">
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
