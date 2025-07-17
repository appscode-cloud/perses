import { MouseEvent, ReactElement, useState } from 'react';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import AccountCircle from 'mdi-material-ui/AccountCircle';
import Logout from 'mdi-material-ui/Logout';
import { useAuthToken } from '../../model/auth-client';
import { ThemeSwitch } from './ThemeSwitch';

export function AccountMenu(): ReactElement {
  const { data: decodedToken } = useAuthToken();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [appsAnchorEl, setAppsAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };

  const handleAppsMenu = (event: MouseEvent<HTMLElement>): void => {
    setAppsAnchorEl(event.currentTarget);
  };

  const handleCloseAppsMenu = (): void => {
    setAppsAnchorEl(null);
  };

  const appsItems = ['Dashboard', 'Profile', 'Settings', 'Messages', 'Notifications', 'Help'];

  return (
    <>
      {/* Apps Menu Button */}
      <IconButton
        aria-label="Apps menu"
        aria-controls="apps-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleAppsMenu}
        sx={{
          width: 40,
          height: 40,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </IconButton>

      {/* Apps Menu */}
      <Menu
        id="apps-menu"
        anchorEl={appsAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        open={appsAnchorEl !== null}
        onClose={handleCloseAppsMenu}
      >
        {appsItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              console.log(`Clicked: ${item}`);
              handleCloseAppsMenu();
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>

      {/* Account Menu Button */}
      <IconButton
        aria-label="Account menu"
        aria-controls="menu-account-list-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>

      {/* Account Menu */}
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
        sx={{
          '& .MuiPaper-root': {
            minWidth: 280,
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          {decodedToken?.sub}
        </MenuItem>
        <Divider />
        <ThemeSwitch isAuthEnabled />

        <MenuItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Switch Account</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </MenuItem>
        <MenuItem sx={{ pl: 4, backgroundColor: '#f5f5f5' }}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>testing-org</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Organization</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </MenuItem>

        {/* Other Organizations */}
        <MenuItem sx={{ pl: 4 }}>
          <ListItemIcon>
            <div
              style={{
                width: 24,
                height: 24,
                backgroundColor: '#4CAF50',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              A
            </div>
          </ListItemIcon>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>appscode</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Personal Account</div>
          </div>
        </MenuItem>

        <MenuItem sx={{ pl: 4 }}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>1111</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Organization</div>
          </div>
        </MenuItem>

        <MenuItem sx={{ pl: 4 }}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>11111</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Organization</div>
          </div>
        </MenuItem>

        <MenuItem sx={{ pl: 4 }}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>111112</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Organization</div>
          </div>
        </MenuItem>

        <Divider />
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
